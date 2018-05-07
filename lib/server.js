var express = require('express');
var app = express();

var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);


//require('passport')(passport);

//settings


//middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 's3Cur3',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('../routes/routes.js')(app,passport);

// static files
app.use(express.static(path.join(path.dirname(__dirname) + ("/public"))));

/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('designTrainnig',function(trainning){
    console.log(trainning);
  });
  socket.on('trainning',function(){
    console.log("Entrenando");
  });
});
*/

http.listen(3000, function(){
  console.log('listening on :3000');
});
