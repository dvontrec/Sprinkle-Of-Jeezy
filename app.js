//********************************
//		Basic Variables
//********************************
var express = require("express");
var passport = require("passport");
var bodyParser = require("body-parser");
var User = require("./models/user");
var localStrategy = require("passport-local");
var passportlocalMongoose = require("passport-local-mongoose");
var quoteRoutes = require("./routes/quotes");
var methodOverride = require("method-override");
var app = express();

//tells application what packages to use
//tells app to pull files from public directory
app.use(express.static(__dirname + "/public" ))
//tells app to use _method for method-override
app.use(methodOverride("_method"));
//tells app to use express session
app.use(require("express-session")({
	//secret is used to encode and decode the sessions
	secret: process.env.SECRET,
	resave: false, 
	saveUninitialized: false
}));
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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


//********************************
//		Routes
//********************************
//use routes with specific path
app.use("/api/quotes", quoteRoutes);

//index route
app.get("/", function(req, res, next){
	//send home page as text
	res.render("index")
});
//create quote route
app.get("/quotecreator", function(req, res)
{
	res.render("quoteform")
})
//			AUTH routes
//=================================
//register route
app.get("/register", function(req, res){
	res.render("register");
});
//register function
app.post("/register", function(req, res)
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
app.get("/login", function(req, res){
	res.render("login");
});
//login function
app.post("/login", passport.authenticate("local", 
	{
		//if the user successfully logs in redirect to the quote creator route
		successRedirect: "/quotecreator",
		//if the login is unsuccessfull redirect to the login route
		failureRedirect: "/login"
	}), function(req, res)
	{});

//catch all
app.get("/*", function(req, res, next){
	res.send("You lost?");
})

//logout route
app.get("/logout", function(req, res)
{
	req.logout();
	res.redirect("/")
});



//********************************
//		Add listener
//********************************
app.listen(process.env.PORT, function(){
	console.log("sprinkling on port " + process.env.PORT);
})
