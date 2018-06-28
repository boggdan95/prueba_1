const User = require('./user');

function userLogged( req ) {
    User.findOne({'username': req.body.username}, function(err,user) {
    if (err) { return handleError(err);}
    var usuario = req.body.username;
    console.log(usuario);
    return usuario;
  });
}

module.exports.userLogged = userLogged;
