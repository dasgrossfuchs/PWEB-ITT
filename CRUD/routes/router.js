/* jshint esversion: 6*/

//import modules
const express = require('express');
const Product = require('../models/product');//esquema
const path = require('path');

//Create aa routes object
const router = express.Router();
//export our router
module.exports = router;

//ejemplo de consulta de todos los datos
router.get('/api/product',(req,res)=>{
    Product.find({},(err,resultado)=>{
        if(err) return res.status(500).send({
            message:`Error al realizar la petición : ${err}`
        });
        if(!resultado) return res.status(404).send({
            message: 'No existen resultados'
        })
        res.status(200).send({product:[resultado]});
    }).lean();
});

//ejemplo insertar
router.post('/api/product',(req,res)=>{
    
});


////// RENDERS Y RUTAS  /////

//pagina home
router.get('/',(req,res)=>{
    res.render('home');
    // res.status(200).send('hola mundo')
});

//pagina login
router.get('/login',(req,res)=>{
    res.status(200).send('soy login');
});

//este va hasta el final para evitar problemas de conexión
router.use((req,res)=>{
    res.status(404).render('notfound');
    console.log(res.statusCode);
});


