/*jshint esversion: 6*/ 

//importar modulos
const { Console } = require('console');
const express = require('express');
const path = require('path');
const funciones = require('../funciones');
//Creamos un objeto de router express
const router = express.Router();
//exportar nuestro modulo route
module.exports = router;

const datosContacto = {phone: "(+52)477-475-1053", email:"contacto@nosotros.com", fb:"Nosotros#US"};
const datosHome = {al1:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
al2:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
al3:"Lorem ipsum dolor sit amet consectetur adipisicing elit."};
const datosAbout = {mission:"To Do!", vision: "To See!", who:"We are us!"};


router.get('/',(req,res)=>{
    res.render('pages/home',{ dH : datosHome , title:"Home"});
});

router.get('/about',(req,res)=>{
    const users = [
        {name : 'Agus', email:'gusgus@gmail.com', avatar:'http://placekitten.com/300/300'},
        {name : 'Clau', email:'cloclo@gmail.com', avatar:'http://placekitten.com/300/200'},
        {name : 'Cinthia', email:'cincin@gmail.com', avatar:'http://placekitten.com/350/300'},
        {name : 'Nava', email:'nelnel@gmail.com', avatar:'http://placekitten.com/250/300'}
    ];
    res.render('pages/about', {dA:datosAbout, title:"About", usuarios : users});
});

const MiddleWare = function (req,res,next){
    var result = '';
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    var charsLength = chars.length;
    result += chars.charAt(Math.floor(Math.random() * charsLength));
    result += chars.charAt(Math.floor(Math.random() * charsLength));
    result += Math.floor(Math.random()*10);
    req.MiddleWare = result.toUpperCase();
    next();
}

router.get('/contact',(req,res)=>{
    res.render('pages/contact',{cont : datosContacto, title:"Contact", resultanteRFC : 'Aquí aparecerá tu RFC'});
});

router.post('/contact',MiddleWare,(req,res)=>{
    var RFC = funciones.procesar(req.body) + req.MiddleWare;
    res.render('pages/contact',{cont : datosContacto, title:"Contact", resultanteRFC : RFC});
});
