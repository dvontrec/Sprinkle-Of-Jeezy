//connect to mongoose
var mongoose = require("mongoose");

//Create/Connect to database
mongoose.connect("mongodb://localhost/sprinkle-of-jeezy-api");

//sends out the Qoute model to any file accessing this index file
module.exports.Qoute = require("./qoute");