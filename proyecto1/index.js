var http = require('http');
var url = require('url')
var server = http.createServer();
server.on('request', function (peticion, respuesta) {
    respuesta.writeHead(200,
        { 'Content-Type': 'text/html;charset=utf-8' });
 
    var base = url.parse(peticion.url, true)
    var params = base.query
    var salida = ""
 
    switch (base.pathname) {
        case "/tablas":
            salida += tablas(params.num, params.min, params.max)
            break
        case "/calculadora":
            salida += calculadora(params.num1, params.num2, params.op)
            break
        case "/calendario":
            salida += calendario(params.mes, params.año)
    }
 
    respuesta.write(salida)
    respuesta.end();
});
server.listen(8080, "127.0.0.1");
console.log("Corriendo");

function tablas(num, min, max) {
    if (num != undefined) {
        var salida = ""
        for (var i = 1; i <= 10; i++) {
            salida += num + " x " + i + " = " + num * i + "<br>"
        }
        return salida
    } else if (min != undefined && max != undefined) {
        var salida = ""
        for (var i = min; i <= max; i++) {
            for (var j = 1; j <= 10; j++) {
                salida += i + " x " + j + " = " + i * j + "<br>"
            }
            salida += "<br>"
        }
        return salida
    } else {
        var salida = ""
        for (var i = 1; i <= 10; i++) {
            for (var j = 1; j <= 10; j++) {
                salida += i + " x " + j + " = " + i * j + "<br>"
            }
            salida += "<br>"
        }
        return salida
    }
}
 
function calculadora(num1, num2, op) {
    var devolver = ""
    switch (op) {
        case "suma":
            devolver += (num1*1 + num2*1)
            break
        case "resta":
            devolver += (num1 - num2)
            break
        case "multiplicacion":
            devolver += (num1 * num2)
            break
        case "division":
            devolver += (num1 / num2)
            break
    }
    return devolver
}
 
function calendario (month, year) {
    var diasMes = new Date(year, month, 0).getDate()
    var separacion = new Date(year, month-1).getDay() - 1
    var huecos = separacion
    var salida = "<table><thead><tr><td>"
    salida += ["L","M","X","J","V","S","D"].join("</td><td>") + "</td>"
    salida += "</tr></thead><tbody><tr>"
    for (var i = 1; i <= diasMes + separacion; i++){
        salida += "<td>"
        huecos != 0 ? huecos -- : salida += i - separacion
        salida += "</td>"
        salida += i % 7 == 0 ?  "</tr></tr>" : ""
    }
    salida += "</tr>"
    return salida
}