// npm install express express-handlebars mongoose
// npm install nodemon --save-dev
'use strict'
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
mongoose.connect(config.db, (err,res)=>{
    if(err){
        console.log(`Error al conectar en la BD ${err}`)
    }
    console.log('Conexion a la BD exitosa')
    app.listen(config.port, ()=>{
        console.log(`Ejecutando en http://localhost:${config.port}`);
    });
})