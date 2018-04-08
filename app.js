//********************************
//		Basic Variables
//********************************
var express = require("express");
var app = express()
var port = 3000 || process.env.PORT;

//********************************
//		Routes
//********************************
//index route
app.get("/", function(req, res){
	//send home page as text
	res.send("Home Page")
});
//index api page
app.get("/api", function(req, res){
	res.send({"name":"Works"})
})


//********************************
//		Add listener
//********************************
app.listen(port, function(){
	console.log("sprinkling on port " + port);
})
