// npm install express express-handlebars mongoose
// npm install nodemon --save-dev
'use strict';
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const hbs = require('express-handlebars');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//recursos estáticos/ públicos
app.use('/static', express.static('public'))

//motor de vistas

app.engine('.hbs',hbs({
    defaultLayout : 'index',
    extname : '.hbs'
}))

app.set('view engine', '.hbs')

app.get('/',(req,res)=>{
    res.render('home');
    // res.status(200).send('hola mundo')
})
//este va hasta el final para evitar problemas de conexión
app.use((req,res)=>{
    res.status(404).render('notfound');
    console.log(res.statusCode);
})

mongoose.connect(config.db, config.urlParser, (err,res)=>{
    if(err){
        console.log(`Error al conectar en la BD ${err}`);
    }
    else  {
        console.log('Conexión a la BD exitosa');
        app.listen(config.port, ()=>{
            console.log(`Ejecutando en http://localhost:${config.port}`)
        });
    }
})
//Agustin Valdés Fuchs