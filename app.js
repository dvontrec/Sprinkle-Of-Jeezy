//********************************
//		Basic Variables
//********************************
const express = require("express");
const port = process.env.PORT || 8000;
const flash = require('connect-flash');
const passport = require("passport");
const bodyParser = require("body-parser");
const expressSanitizer = require('express-sanitizer');
const User = require("./models/user");
const localStrategy = require("passport-local");
const passportlocalMongoose = require("passport-local-mongoose");
const quoteRoutes = require("./routes/quotes");
const authRoutes = require('./routes/auth');
const suggestRoutes = require('./routes/suggestions')
const indexRoutes = require("./routes/index");
const methodOverride = require("method-override");
const middleware = require("./middleware");
const app = express();

//tells application what packages to use
//tells app to pull files from public directory
app.use(express.static(__dirname + "/public" ));
app.use(express.static(__dirname + "/views" ));

//tells app to use _method for method-override
app.use(methodOverride("_method"));
//tells app to use express session
app.use(require("express-session")({
	//secret is used to encode and decode the sessions
	secret: process.env.SECRET,
	resave: false, 
	saveUninitialized: false
}));
//tells the app to use flash
app.use(flash());

//setup cors
app.use((req, res, next) =>
{
	res.header("Access-Control-Allow-Origin", "*")  //Sets the header for all(*) changing second arg can ensure other web pages cant access api
	res.header("Access-Control-Allow-Headers", "*")  //defines headers that can be set
	//checks request method
	if(req.method === "OPTIONS") //PUT/POST
	{
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE GET") //all http words the api supports
		return res.status(200),json({});  //tells the route it is successful with those options
	}
	next(); //calls next function
});

//tells the app what parts of body parser to use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//tells the app to use express sanitizer to escape form content
app.use(expressSanitizer());

//sets view engine to ejs
app.set("view engine", "ejs")
//tells app to use passport
app.use(passport.initialize());
app.use(passport.session());
//creates a new local strategy
passport.use(new localStrategy(User.authenticate()));
//encodes data and puts it in the session
passport.serializeUser(User.serializeUser());
//reads the session and unencodes the data
passport.deserializeUser(User.deserializeUser());
//Sets the app up to see the user ans send flash
app.use(function(req, res, next)
{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
})


//********************************
//		Routes
//********************************
//use routes with specific path
app.use("/api/quotes", quoteRoutes);
app.use("/", authRoutes);
app.use("/api/suggestions", suggestRoutes);
app.use("/", indexRoutes);






//********************************
//		Add listener
//********************************
app.listen(port, function(){
	console.log("sprinkling on port " + port);
});
