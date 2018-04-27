//********************************
//		Basic Variables
//********************************
var express = require("express");
var bodyParser = require("body-parser");
var quoteRoutes = require("./routes/quotes");
var methodOverride = require("method-override");
var app = express();

//tells application what packages to use
//tells app to pull files from public directory
app.use(express.static(__dirname + "/public" ))
//tells app to use _method for method-override
app.use(methodOverride("_method"));
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

//catch all
app.get("/*", function(req, res, next){
	res.send("You lost?");
})



//********************************
//		Add listener
//********************************
app.listen(process.env.PORT, function(){
	console.log("sprinkling on port " + process.env.PORT);
})
