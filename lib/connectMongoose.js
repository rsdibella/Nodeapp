'use strict';

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
    console.log('Eroor de conexiona MonDB', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect('mongodb://127.0.0.1/nodeapp')

module.exports = mongoose.connection;
