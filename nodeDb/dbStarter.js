let fs = require('fs'), path = require('path');
let dbConfig = "db.config"
var fork = require('child_process').fork;

if(process.argv.length === 3){
    dbConfig = process.argv[2];
}

let filePath = path.join(__dirname, dbConfig);
let servers = [];

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        let config = JSON.parse(data);
        for (let serverIdx = 0; serverIdx < config["dbInstances"].length; serverIdx++){
            let name = config["dbInstances"][serverIdx]["name"];
            let port = config["dbInstances"][serverIdx]["port"];
            let serv = config["dbInstances"][serverIdx]["server"];
            const forked = fork(`${__dirname}/db.js`, [name, serv, port]);
        }
    } else {
        console.log(err);
    }
});