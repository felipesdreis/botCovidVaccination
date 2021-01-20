const request = require('request');
const csv = require('csvtojson');
var fs = require('fs');
require('dotenv').config()

var csvFilePath = process.env.FILE
csvFilePath = csvFilePath.toString()
console.log(process.env.FILE);

var data = new Date();
var dia = data.getDate() - 1; // 1-31
var mes = data.getMonth() + 1; // 0-11 (zero=janeiro)
var ano4 = data.getFullYear(); // 4 d�gitos
var dataHoje = `${ano4}-${('0' + mes).slice(-2)}-${('0' + dia).slice(-2)}`;
var dataBR = `${('0' + dia).slice(-2)}/${('0' + mes).slice(-2)}/${ano4}`



function preparafile(csv) {
    fs.writeFile(csvFilePath, csv, function (err) {
        if (err) throw err;
    });
}

function readFile() {

    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            var today = jsonObj.filter((e) => {
                return e.date == dataHoje
            })

            //World
            var World = today.filter((e) => {
                return e.location == 'World'
            })
            if (World.length > 0) {
                request.get('http://localhost:1880/postCovid?texto=Vacinados até o dia ' + dataBR + " no Mundo, " + parseInt(World[0].total_vaccinations).toLocaleString())
            }

            //brasil
            var bra = today.filter((e) => {
                return e.location == 'Brazil'
            })
            if (bra.length > 0) {
                request.get('http://localhost:1880/postCovid?texto=Vacinados até o dia ' + dataBR + " no Brasil, " + parseInt(bra[0].total_vaccinations).toLocaleString())
            }

            //estados unidos
            var usa = today.filter((e) => {
                return e.location == 'United States'
            })
            if (usa.length > 0) {
                request.get('http://localhost:1880/postCovid?texto=Vacinados até o dia ' + dataBR + " nos Estados Unidos, " + parseInt(usa[0].total_vaccinations).toLocaleString())
            }

            //Inglaterra
            var gbr = today.filter((e) => {
                return e.location == 'United Kingdom'
            })
            if (gbr.length > 0) {
                request.get('http://localhost:1880/postCovid?texto=Vacinados até o dia ' + dataBR + " na Inglaterra, " + parseInt(gbr[0].total_vaccinations).toLocaleString())
            }

            //Canada
            var can = today.filter((e) => {
                return e.location == 'Canada'
            })
            if (can.length > 0) {
                request.get('http://localhost:1880/postCovid?texto=Vacinados até o dia ' + dataBR + " no Canada, " + parseInt(can[0].total_vaccinations).toLocaleString())
            }

            //Chile
            var chl = today.filter((e) => {
                return e.location == 'Chile'
            })
            if (chl.length > 0) {
                request.get('http://localhost:1880/postCovid?texto=Vacinados até o dia ' + dataBR + " no Chile, " + parseInt(chl[0].total_vaccinations).toLocaleString())
            }

            //Italy
            var ita = today.filter((e) => {
                return e.location == 'Italy'
            })
            if (ita.length > 0) {
                request.get('http://localhost:1880/postCovid?texto=Vacinados até o dia ' + dataBR + " na Italia, " + parseInt(ita[0].total_vaccinations).toLocaleString())
            }

            //Spain
            var spa = today.filter((e) => {
                return e.location == 'Spain'
            })
            if (spa.length > 0) {
                request.get('http://localhost:1880/postCovid?texto=Vacinados até o dia ' + dataBR + " na Espanha, " + parseInt(spa[0].total_vaccinations).toLocaleString())
            }


        })

}

function main() {
    request('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            preparafile(body);
            readFile();

        }
        else {
            console.log("Error " + response.statusCode)
        }
    })
}

main();






