
const readline = require('readline');
const mongoose = require("mongoose");
const Anuncio = require('./models/Anuncio');


async function main() {
    const continuar = await pregunta ('¿Deseas borrar la base de datos? s/n');
    if (!continuar) {
        process.exit();
    }
    const connection = require('./lib/connectMongoose');

    await initAnuncios();
    connection.close();
};

main().catch(err => console.log('Error!', err));

async function initAnuncios(){
    const result = await Anuncio.deleteMany();
    console.log (`Eliminados ${ result.deletedCount } anuncios`);

    const inserted = await Anuncio.insertMany ([
        { name: "Amplificador",
        onSell: true,
        price: 100,
        photo: "amplificador.jpg",
        tags: ["lifestyle", "motor"]},
        
        { name: "Bateria",
        onSell: true,
        price: 80,
        photo: "bateria.jpg",
        tags: ["lifestyle"], },
        
        { name: "Cama",
        onSell: false,
        price: 200,
        photo: "cama.jpg",
        tags: ["lifestyle"], },
        
        { name: "Escritorio",
        onSell: true,
        price: 60,
        photo: "escritorio.jpg",
        tags: ["lifestyle", "work"], },
        
        { name: "Guitarra",
        onSell: true,
        price: 135,
        photo: "guitarra.jpg",
        tags: ["lifestyle", "work"], },
        
        { name: "Headphones",
        onSell: false,
        price: 25,
        photo: "headphones.jpg",
        tags: ["lifestyle", "mobile"], },
        
        { name: "iPhone",
        onSell: true,
        price: 1200,
        photo: "iphone.jpg",
        tags: ["lifestyle", "work", "mobile"], },
        
        { name: "Monopatin",
        onSell: true,
        price: 100,
        photo: "monopatin.jpg",
        tags: ["lifestyle", "motor"], },
        
        { name: "Rv",
        onSell: true,
        price: 2700,
        photo: "rv.jpg",
        tags: ["motor"], },
        
        { name: "Television",
        onSell: false,
        price: 220,
        photo: "television.jpg",
        tags: ["lifestyle"], },
        
        { name: "Trompeta",
        onSell: false,
        price: 85,
        photo: "trompeta.jpg",
        tags: ["lifestyle"], }
        ]);

        console.log (`Tenemos ${inserted.length} anuncios creados!`)
    };

function pregunta (texto) {
    return new Promise ((resolve, reject) => {
        const interface = readline.createInterface ({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(texto, res => {
            interface.close();
            if (res.toLowerCase() === 's') {
                resolve (true);
                return;
            }
            resolve (false)
        })
    });
};
