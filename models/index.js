//connect to mongoose
const mongoose = require("mongoose");

//Create/Connect to database
mongoose.connect("mongodb://localhost/sprinkle-of-jeezy-api");

//sends out the Todo model to any file accessing this index file
module.exports.Todo = require("./todo")