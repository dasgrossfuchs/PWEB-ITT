module.exports = {
    "procesar": procesar
}

function procesar(vals, TC,movimientos) {
    var tipo = vals.tipoCambio;
    var recibo = vals.RECIBIDO;
    var pedido = vals.PEDIDO;
    var total = 0.00;
    var cambio = 0.00;
    var mxn = 0;
    var usd = 0;
    if(tipo == 'COMPRA'){
        total = (pedido) * TC.compra;
        total = Math.round((total + Number.EPSILON) * 100) / 100;
        cambio = (recibo - pedido);
        cambio = Math.round((cambio + Number.EPSILON) * 100) / 100;
        var mxn =  parseFloat(movimientos.mxn) - parseFloat(total);
        var usd =  parseFloat(movimientos.usd) + parseFloat(pedido);
        if ((recibo % 1) == 0) recibo = recibo + '.00';
        if ((pedido % 1) == 0) pedido = pedido + '.00';
        if ((cambio % 1) == 0) cambio = cambio + '.00';
        if ((total % 1) == 0) total = total + '.00';
        var transaccion = {pedido : pedido + ' MXN',recibo : recibo + ' MXN', total: total + ' USD', cambio: cambio+' MXN', tipo:tipo}
    }
    if(tipo == 'VENTA'){
        total = (pedido) * TC.venta;
        total = Math.round((total + Number.EPSILON) * 100) / 100;
        cambio = (recibo - pedido);
        cambio = Math.round((cambio + Number.EPSILON) * 100) / 100;
        var mxn =  parseFloat(movimientos.mxn) - parseFloat(total);
        var usd =  parseFloat(movimientos.usd) + parseFloat(pedido);
        if ((recibo % 1) == 0) recibo = recibo + '.00';
        if ((pedido % 1) == 0) pedido = pedido + '.00';
        if ((cambio % 1) == 0) cambio = cambio + '.00';
        if ((total % 1) == 0) total = total + '.00';
        var transaccion = {pedido : pedido + ' USD',recibo : recibo + ' USD', total: total + ' MXN', cambio: cambio+' USD', tipo : tipo};
    }
    var resultado = {trans : transaccion, usd: usd, mxn:mxn };
    return resultado;
}