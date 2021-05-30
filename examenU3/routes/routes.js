//importar modulos
const { Console } = require('console');
const express = require('express');
const path = require('path');
const funciones = require('../funciones');
//Creamos un objeto de router express
const router = express.Router();
//exportar nuestro modulo route
module.exports = router;

var mx = '<button name="switch-btn" class="btn btn-primary switch" type="submit"><img src="/img/mxflag.png">  <i class="fa fa-sync-alt"></i>  <img src="/img/usflag.png"></button>';
var us = '<button name="switch-btn2" class="btn btn-primary switch" type="submit"><img src="/img/usflag.png">  <i class="fa fa-sync-alt"></i>  <img src="/img/mxflag.png"></button>';
var chkMx = 'oninvalid = "this.setCustomValidity(\'VALOR DEBE SER DE 20 o MAS\')" min = "20" step="0.01"';
var chkUs = 'oninvalid = "this.setCustomValidity(\'VALOR DEBE SER DE 1 o MAS\')" min = "1" step="0.01"';
var status = [
    {btnSw : mx, L: 'MXN', R: 'USD', chk:chkMx ,btnSnd: 'Comprar Dólares'},
    {btnSw : us, L: 'USD', R: 'MXN', chk:chkUs ,btnSnd: 'Vender Dólares'}
];
var caja = {usdDIA:500000, usdCIERRE:500000, mxnDIA:500000, mxnCIERRE:500000};

router.get('/', (req, res) => {
    res.render('pages/home', { title: "Home", state :status[0]});
});

router.get('/reporte', (req, res) => {
    var transaccion = { peso:55,dolar:105,residuo:33,tipo:'COMPRA'};
    res.render('pages/reporte', { title: "Reporte de transacción", valores : transaccion });
    //res.render('pages/home', { title: "Home", state :status[0]});
});

router.post('/', (req, res) => {
    if (req.body.hasOwnProperty("switch-btn")) {
        var temp = 1;
        res.render('pages/home', { title: "Home", state : status[temp] });
    } 
    if (req.body.hasOwnProperty("switch-btn2")) {
        var temp = 0;
        res.render('pages/home', { title: "Home", state : status[temp] });
    }
});

router.post('/reporte', (req, res) => {
    if(req.body.tipoCambio == 'COMPRA'){
        var mxn = req.body.MXN;
        var cambio = mxn%(1/0.05);
        var cambio = Math.round((cambio + Number.EPSILON) * 100) / 100;
        mxn = mxn - cambio;
        var usd = mxn * 0.05;
        var usd = Math.round((usd + Number.EPSILON) * 100) / 100
        caja.mxnCIERRE += mxn;
        caja.usdCIERRE -= usd;
        var transaccion = { peso:mxn,dolar:usd,residuo:cambio,tipo:req.body.tipoCambio};
        console.log(usd +'_'+ mxn)
        res.render('pages/reporte', { title: "Reporte de transacción", valores : transaccion });
    }
    if(req.body.tipoCambio == 'VENTA'){
        var usd = req.body.USD;
        var cambio = usd % (1/19.92);
        var cambio = Math.round((cambio + Number.EPSILON) * 100) / 100;
        var usd = usd - cambio;
        var mxn = usd * 19.92;
        var mxn = Math.round((mxn + Number.EPSILON) * 100) / 100;
        caja.usdCIERRE += usd;
        caja.mxnCIERRE -= mxn;
        var transaccion = { peso:mxn,dolar:usd,residuo:cambio, tipo:req.body.tipoCambio};
        console.log(usd +'_'+ mxn)
        res.render('pages/reporte', { title: "Reporte de transacción", valores : transaccion });
    }
});

router.get('/about', (req, res) => {
    res.render('pages/about', {title: "About"});
});


router.get('/contact', (req, res) => {
    res.render('pages/contact', { title: "Contact"});
});
