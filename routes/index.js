var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

//index route
router.get("/", function(req, res, next){
	//send home page as text
	res.render("index")
});
//create quote route
//checks to see if session is currently logged in.
router.get("/quotecreator", middleware.isLoggedIn, function(req, res)
{
	res.render("quoteform")
});

//random quote route
router.get("/randomquote", function(req, res)
{
	res.sendFile(__dirname + "/views/randomQuote.html");
});

router.get("/submitQuote", function(req, res)
{
	res.render("quoteSuggester");
});

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

//catch all
router.get("/*", function(req, res, next){
	res.send("You lost?");
})

//logout route
router.get("/logout", function(req, res)
{
	req.logout();
	res.redirect("/")
});

//exports the router 
module.exports = router;
