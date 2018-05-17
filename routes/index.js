const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleware = require("../middleware");

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



//catch all
router.get("/*", function(req, res, next){
	res.send("You lost?");
})

//exports the router 
module.exports = router;
