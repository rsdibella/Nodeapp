'use strict'

//controlador
const express = require('express');
const router = express.Router();
const createError = require('http-errors')

const Anuncio = require("../../models/Anuncio")



router.get('/', async (req,res,next)=>{
    try{
        const tags = req.query.tags;
        const onSell = req.query.onSell;
        const name = req.query.name;
        const price = req.query.price;

        const skip = req.query.skip;
        const limit = req.query.limit;

        const fields = req.query.fields;

        // filters
        const filter = {};

        if (tags) { // /api1/anuncios?tags=motor
            filter.tags = tags;
        }
        
        if (onSell) { // /api1/anuncios?onSell=true
            filter.onSell = onSell;
        }

        if (name) { // /api1/anuncios?name=am
            filter.name = new RegExp('^' + name, 'i');
        }

        if (price) {

            const priceRange = price.split('-');
            
            if (priceRange.length === 1){
                filter.price = price;
            }else{
                if (priceRange[0] !== '' & priceRange[1] === ''){
                    filter.price={'$gte':priceRange[0]};
                };
                if (priceRange[1] !== '' & priceRange[0] === ''){
                    filter.price={'$lte':priceRange[1]};
                };
                if (priceRange[1] !== '' & priceRange[0] !== ''){
                    filter.price={'$gte':priceRange[0],'$lte':priceRange[1]};
                };
            }
        };

    const anuncios = await Anuncio.array(filter, skip, limit);
    res.json({ results: anuncios });
    } catch (err) {
        next (err);
    }
});

router.post ('/', async (req, res, next) => {
    try {
        const anuncioData = req.body;
        const anuncio = new Anuncio(anuncioData);
        const savedAnuncio = await anuncio.save();
        res.json ({ result: savedAnuncio });
    } catch (err) {
        next (err);
    }
});

router.get('/tags', function(req, res){
    Anuncio.tagsArray(function(err, tags){
        if (err){
            return res.json({err});
        }
        res.json({tags});
    });
});


module.exports = router;
