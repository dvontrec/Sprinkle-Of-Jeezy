const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware');

//=================================
//			AUTH routes
//=================================
//register route
router.get("/register", /*middleware.isAdmin,*/ function(req, res){
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
				res.redirect("/quotecreator")
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
	res.redirect("/");
});



module.exports = router;