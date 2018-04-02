var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(path.dirname(__dirname) + ("/public"))));
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    // __dirname es la direccion de server.js

    res.sendFile(path.join(path.dirname(__dirname) + ("/public/index.html")));
});



app.listen(8080);
