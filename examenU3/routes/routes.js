//importar modulos
const { Console } = require('console');
const express = require('express');
const path = require('path');
const funciones = require('../funciones');
//Creamos un objeto de router express
const router = express.Router();
//exportar nuestro modulo route
module.exports = router;

var mx = '<button name="1" class="btn btn-primary switch" type="submit"><img src="/img/mxflag.png">  <i class="fa fa-sync-alt"></i>  <img src="/img/usflag.png"><br> CAMBIAR TIPO DE TRANSACCIÓN</button>';
var us = '<button class="btn btn-primary switch" type="submit"><img src="/img/usflag.png">  <i class="fa fa-sync-alt"></i>  <img src="/img/mxflag.png"><br> CAMBIAR TIPO DE TRANSACCIÓN</button>';
var status = [
    {btnSw : mx, L: 'MXN', R: 'USD' ,btnSnd: 'COMPRA DOLARES'},
    {btnSw : us, L: 'USD', R: 'MXN' ,btnSnd: 'VENTA DOLARES'}
];
var caja = {usdDIA:9999.99, usdCIERRE:9999.99, mxnDIA:9999.99, mxnCIERRE:9999.99};
var movimientos = {usd:0, mxn:0};
var TC = {venta:19.92, compra:0.05};

router.get('/compraventa', (req, res) => {
    res.render('pages/home', { title: "Transacción", state :status[0], caja, TC});
});

router.get('/ticket', (req, res) => {
    res.redirect('/compraventa')
});

router.post('/compraventa', (req, res) => {
    var temp = 0;
    if (req.body.hasOwnProperty("1")) {
        temp = 1;
    } 
    if (req.body.hasOwnProperty("save")) {
        caja.mxnDIA = req.body.mxnCaja;
        caja.mxnCIERRE = req.body.mxnCaja;
        caja.usdDIA = req.body.usdCaja;
        caja.usdCIERRE = req.body.usdCaja;
        TC.compra = req.body.compraTc;
        TC.venta = req.body.ventaTc;
    }
    if (req.body.hasOwnProperty("reset")) {
        caja.mxnDIA = req.body.mxnCaja;
        caja.mxnCIERRE = req.body.mxnCaja;
        caja.usdDIA = req.body.usdCaja;
        caja.usdCIERRE = req.body.usdCaja;
        TC.compra = req.body.compraTc;
        TC.venta = req.body.ventaTc;
        var movimientos = {usd:0, mxn:0};
    }
    res.render('pages/home', { title: "Transacción", state : status[temp] , caja, TC});
});

router.post('/ticket', (req, res) => {
    var total = funciones.procesar(req.body,TC,movimientos);
    movimientos.mxn = parseFloat(total.mxn);
    movimientos.usd = parseFloat(total.usd);
    
    var temp = (parseFloat(caja.mxnDIA) + parseFloat(movimientos.mxn));
    if ((temp % 1) == 0) temp = temp + '.00';
    temp = Math.round((temp + Number.EPSILON) * 100) / 100;
    caja.mxnCIERRE = temp;

    var temp = (parseFloat(caja.usdDIA) + parseFloat(movimientos.usd));
    if ((temp % 1) == 0) temp = temp + '.00';
    temp = Math.round((temp + Number.EPSILON) * 100) / 100;
    caja.usdCIERRE = temp; 
    var transaccion = total.trans;
    res.render('pages/ticket', { title: "Ticket de transacción", valores : transaccion });
});

router.get('/reporte', (req, res) => {
    res.render('pages/reporte', {title: "REPORTE DEL DIA", caja, movimientos});
});
router.get('/', (req, res) => {
    res.render('pages/conf', {title: "REPORTE DEL DIA", caja, TC});
});