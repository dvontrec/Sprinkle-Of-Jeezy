//********************************
//		Basic Variables
//********************************
var express = require("express");
var bodyParser = require("body-parser");
var quoteRoutes = require("./routes/quotes");
var port = process.env.PORT;
var app = express();

//tells application what packages to use
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



//********************************
//		Add listener
//********************************
app.listen(port, function(){
	console.log("sprinkling on port " + port);
})
