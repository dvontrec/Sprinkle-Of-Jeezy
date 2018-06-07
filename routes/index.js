const express = require("express");
//uses the path package to concatinate path files easier
const path = require('path');
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleware = require("../middleware");


//api route
router.get("/api", function(req, res, next){
	//send home page as text
	res.render("index")
});
//create quote route
//checks to see if session is currently logged in.
router.get("/quotecreator", middleware.isLoggedIn, function(req, res)
{
	res.render("quotes/quoteform")
});

//random quote route / index
router.get("/", function(req, res)
{
	//makes a variable that stores the path to the random quote html
	const randomQuoteLocation = path.join(__dirname, "../views/index/randomQuote.html")
	res.sendFile(randomQuoteLocation);
});

router.get("/adminSuggestions", middleware.isLoggedIn,  function(req, res)
{
	//makes a variable that stores the path to the random quote html
	const adminSuggestionLocation = path.join(__dirname, "../views/suggestions/adminSuggestions.html")
	res.sendFile(adminSuggestionLocation);
})

//catch all
router.get("/*", function(req, res, next){
	res.send("You lost?");
})

//exports the router 
module.exports = router;
