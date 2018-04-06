const express = require("express");
const router = express.Router();

//		CREATE
//		READ
router.get("/", function(req, res){
	res.send({"test": "pass"});
})
//		EDIT
//		UPDATE
//		DELETE

module.exports = router;