const CustomStrategy = require('passport-custom').Strategy;

const User = require('./user');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    // used to deserialize user
    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });

    // Register
    passport.use('register', new CustomStrategy(function (req, done) {

      User.findOne({'username': req.body.username}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('registerMessage', 'the username is already taken'));
        } else {

          //Creacion del constructor de usuario
          var newUser = new User();
          newUser.username = req.body.username;
          newUser.password = newUser.generateHash(req.body.password);
          newUser.firstName = req.body.name;
          newUser.lastName = req.body.lastName;
          newUser.age = req.body.age;
          newUser.save(function (err) {
            if (err) { throw err; }
            return done(null, newUser);
            console.log(newUser);
          });
        }
      });
    }));

    // login
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local
    passport.use('login', new CustomStrategy(function (req,done) {
        User.findOne({'username': req.body.username}, function (err,user) {
        if (err) {
          return done(err); }
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No User found'));
        }
        if (!user.validatePassword(req.body.password)) {
          console.log('No coincide la contraseña');
          return done(null, false, { message: 'Invalid password' });
          console.log('No coincide la contraseña 2');
        }
          return done(null, user);
      });
    }));
  }
