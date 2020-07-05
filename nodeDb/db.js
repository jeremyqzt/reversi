
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var gameStates = {};

var name, serverIp, port;

if(process.argv.length === 5){
    name = process.argv[2];
    serverIp = process.argv[3];
    port = process.argv[4];
} else {
    process.exit();
}

app.get('/id', function (req, res) {
    res.send(name);
})

app.get('/gameState/:gid', function (req, res) {
    var gid = req.params.gid;
    if(gid in gameStates){
        res.status(200).send(gameStates[gid]);
    } else {
        res.status(404).send({});
    }
})

app.post('/gameState/:gid', function (req, res) {
    var gid = req.params.gid;
    var newState = req.body.newState;
    gameStates[gid] = newState;
    console.log("Created " + gid)
    res.status(200).end();
})
        
var server = app.listen(port, serverIp, function () {
    console.log(`Server Isntance ${name} Listening on ${serverIp}:${port}`);
});