const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware');

//=================================
//			AUTH routes
//=================================
//register route
router.get('/register', middleware.isAdmin, function(req, res) {
  // res.render('index/register');
});
//register function
router.post('/register', middleware.isAdmin, function(req, res) {
  //saves the user from the registration form
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, nUser) {
    if (err) {
      req.flash('error', err.message);
      res.redirect('back');
    } else {
      passport.authenticate('local')(req, res, function() {
        console.log('logged in as ', nUser.username);
        req.flash('success', `welcome to the back end ${nUser.username}`);
        res.redirect('/api');
      });
    }
  });
});
//login route
router.get('/login', function(req, res) {
  res.render('index/login');
});
//login function
router.post(
  '/login',
  passport.authenticate('local', {
    //if the user successfully logs in redirect to the quote creator route
    successRedirect: '/',
    //if the login is unsuccessfull redirect to the login route
    failureRedirect: '/login'
  }),
  function(req, res) {}
);

//logout route
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  console.log('logged out');
  res.redirect('/');
});

module.exports = router;
