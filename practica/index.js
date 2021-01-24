//Carga los módulos
var http = require('http');
var url = require('url');
var fs = require('fs');
//Crea el servidor
http.createServer(function(peticion, respuesta) 
{
    //Obtenemos datos de la url
    let urlContent = url.parse(peticion.url, true).pathname;
    let urlValues = url.parse(peticion.url, true).query;

    //En el directorio dni
    if(urlContent=="/dni"){
        //Leemos el archivo
        fs.readFile('instrucciones.html', function(err, dato){
            if(err){
                throw err;
            }
            //Damos la respuesta
            respuesta.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
            //Si existe variable num
            if(urlValues.num!=undefined){
                let letra = calcularDNI(urlValues.num);
                let resultado = '<!DOCTYPE html><html><head><meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Resultado</title>'
                + '<meta name="viewport" content="width=device-width, initial-scale=1"></head><body><h1>El dni completo es: '+ (urlValues.num+letra) +'</h1>'
                + '</body></html>';
                respuesta.write(resultado);
            }
            //Si no se ha dado ningún num por url
            else{
                respuesta.write(dato);
            }
            respuesta.end();
        });
    }

    //En el directorio escribir
    else if(urlContent=="/escribir"){
        if(!fs.existsSync("./Copia")){
            fs.mkdir('./Copia', function(err){
                if(err){
                    throw err;
                }
                console.log("Carpeta creada");
            });
        }
        fs.writeFile('./Copia/holaMundo.txt', 'Francisco José López Montesinos', function(err){
            if(err){
                throw err;
            }
            console.log('Archivo de texto creado');
        });

        respuesta.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        respuesta.write('<h1>La carpeta y el archivo de texto han sido creados</h1>');
        respuesta.end();
    }
    //Respuesta para las demás direcciones
    else{
        respuesta.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        respuesta.write('<h1>Estás en la página por defecto</h1>');
        respuesta.write('<p>Escribe una dirección en la url para navegar</p>');
        respuesta.end();
    }
}).listen(8083, '127.0.0.3');
console.log('Servidor ejecutándose en http://127.0.0.3:8083/');

//función para calcular la letra del DNI correspondiente
function calcularDNI (numDNI){
    let resto = numDNI%23;
    switch(resto){
        case 0: return 'T';
        case 1: return 'R';
        case 2: return 'W';
        case 3: return 'A';
        case 4: return 'G';
        case 5: return 'M';
        case 6: return 'Y';
        case 7: return 'F';
        case 8: return 'P';
        case 9: return 'D';
        case 10: return 'X';
        case 11: return 'B';
        case 12: return 'N';
        case 13: return 'J';
        case 14: return 'Z';
        case 15: return 'S';
        case 16: return 'Q';
        case 17: return 'V';
        case 18: return 'H';
        case 19: return 'L';
        case 20: return 'C';
        case 21: return 'K';
        case 22: return 'E';
    }
}