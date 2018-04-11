//********************************
//		Basic Variables
//********************************
var express = require("express");
var bodyParser = require("body-parser");
var quoteRoutes = require("./routes/quotes");
var cors = require("cors");
var app = express();

//tells application what packages to use
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//********************************
//		Routes
//********************************
//use routes with specific path
app.use("/api/quotes", quoteRoutes);

//index route
app.get("/", function(req, res){
	//send home page as text
	res.send("Home Page")
});

//catch all
app.get("/*", function(req, res){
	res.send("You lost?");
})



//********************************
//		Add listener
//********************************
app.listen(process.env.PORT, function(){
	console.log("sprinkling on port " + process.env.PORT);
})
