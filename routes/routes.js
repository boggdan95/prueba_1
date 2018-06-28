module.exports = (app, passport, actions, User) => {

  app.get('/',(req,res) => {
    res.sendFile('index.html', {"root": __dirname + '/../public/'});
  });

  app.get('/login',(req,res) => {
    res.sendFile('login.html', {"root": __dirname + '/../public/'} ,{
      message: req.flash('loginMessage')
    });
  });

  app.post('/login',passport.authenticate('login',
    { successRedirect: '/homepage',
      failureRedirect: '/login' })
  );

  app.get('/register', (req,res) => {
    res.sendFile('register.html', {"root": __dirname + '/../public/'} ,{
      message: req.flash('registerMessage')
    });
  });

  app.post('/register', passport.authenticate('register', {
    successRedirect: '/',
    failuredRedirect: '/register',
    failureFlash: true
  }));

  app.get('/homepage', isLoggedIn,(req,res) => {
    res.sendFile('views/homepage.html', {"root": __dirname + '/../public/'});

  });

  app.get('/homepage.html', isLoggedIn, (req,res) => {
    res.sendFile('views/homepage.html', {"root": __dirname + '/../public/'});
  });

  app.get('/entrenamiento.html', isLoggedIn, (req,res) => {
    res.sendFile('views/entrenamiento.html', {"root": __dirname + '/../public/'});
  });

  app.post('/entrenamientoPersonalizado.html', (req, res) => {

      console.log(req.body);
      res.sendFile('views/resultadosEntrenamiento.html', {"root": __dirname + '/../public/'});
  });

  app.get('/games.html', isLoggedIn, (req,res) => {
    res.sendFile('views/games.html', {"root": __dirname + '/../public/'});
  });

  app.get('/config.html', isLoggedIn, (req,res) => {
    res.sendFile('views/config.html', {"root": __dirname + '/../public/'});
  });

  app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}
