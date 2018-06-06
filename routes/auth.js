const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware');

//=================================
//			AUTH routes
//=================================
//register route
router.get("/register", middleware.isLoggedIn, function(req, res){
	res.render("register");
});
//register function
router.post("/register", function(req, res)
{
	//saves the user from the registration form
	var newUser = new User({username:req.body.username});
	User.register(newUser, req.body.password, function(err, nUser)
	{
		if(err){return res.send(err)}
		else
		{
			passport.authenticate("local")(req, res, function()
			{
				req.flash('success', `welcome to the back end ${nUser.username}`);
				res.redirect("/api")
			})
		}
	})

});
//login route
router.get("/login", function(req, res){
	res.render("login");
});
//login function
router.post("/login", passport.authenticate("local", 
	{
		//if the user successfully logs in redirect to the quote creator route
		successRedirect: "/",
		//if the login is unsuccessfull redirect to the login route
		failureRedirect: "/login"
	}), function(req, res)
	{});


//logout route
router.get("/logout", function(req, res)
{
	req.logout();
	req.flash("success", "You have logged out")
	console.log('logged out');
	res.redirect("/api");
});



module.exports = router;