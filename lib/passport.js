const localStrategy = require('passport-local').Strategy;

const user = require('user');

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
    passport.use('register', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      userfirstName: 'name',
      userlastName: 'lastName',
      userage: 'age',
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, firstName, lastName, age, done) {
      User.findOne({'username': username}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('registerMessage', 'the username is already taken'));
        } else {
          var newUser = new user();
          newUser.username = username;
          newUser.password = newUser.generateHash(password);
          newUser.firstName = firstName;
          newUser.lastName = lastName;
          newUser.age = age;
          newUser.save(function (err) {
            if (err) { throw err; }
            return done(null, newUser);
          });
        }
      });
    }));

    // login
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local
    passport.use('login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      User.findOne({'username': username}, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No User found'))
        }
        if (!user.validatePassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Wrong. password'));
        }
        return done(null, user);
      });
    }));
  }
