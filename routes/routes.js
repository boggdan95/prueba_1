module.exports = (app, passport) => {

  app.get('/',(req,res) => {
    res.sendFile('index.html', {"root": __dirname + '/../public/'});
  });

  app.get('/login',(req,res) => {
    res.sendFile('login.html', {"root": __dirname + '/../public/'} ,{
      message: req.flash('loginMessage')
    });
  });

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/homepage',
    failuredRedirect: '/login',
    failureFlash: true
  }));

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

  app.get('/homepage', isLoggedIn ,(req,res) => {
    res.sendFile('views/homepage.html', {"root": __dirname + '/../public/'});
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
