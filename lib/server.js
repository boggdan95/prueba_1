var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.use(express.static(path.join(path.dirname(__dirname) + ("/public"))));
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    // __dirname es la direccion de server.js
  res.sendFile(path.join(path.dirname(__dirname) + ("/public/index.html")));
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('designTrainning',function(trainning){
    console.log(trainning);
  });
  socket.on('trainning',function(trainning){
    console.log(trainning);
  });
});

http.listen(3000, function(){
  console.log('listening on :3000');
});
