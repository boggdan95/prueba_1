var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true /*required: true*/},
    password: {type: String  /*required: true*/},
    firstName: {type: String /*required: true*/},
    lastName: {type: String /*required: true*/},
    age: {type: Number /*required: true*/}
});

//Encripta el strig ingresado como constraseña
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Validad password, verifica si el ingreso y la constraseña guardada son iguales
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for user and expose it to our app
module.exports = mongoose.model('User', userSchema);
