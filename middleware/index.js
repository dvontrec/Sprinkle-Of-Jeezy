//creates an object to store the middleware functions
var middlewareObj = {};

//********************************
//		MiddleWare
//********************************
//checks to see if the current session is logged in
middlewareObj.isLoggedIn = function(req, res, next) {
	//checks to see if the request is from an authenticated user
	if (req.isAuthenticated() && req.user.salt) {
		//moves on to the next function.  usually the callback
		return next();
	}
	//if the user is not authenticated we will continue.  No need for an else because we return if conditions are met
	else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('/login');
	}
};

//middleware used to see if the user logged in is an admin
middlewareObj.isAdmin = function(req, res, next) {
	//checks to see if the request is from an authenticated user
	if (req.isAuthenticated() && req.user.salt) {
		//moves on to the next function.  usually the callback
		return next();
	}

	//else only show the json of quotes
	else {
		res.redirect('/api/quotes');
	}
};

//function used to sanitize the request body
middlewareObj.sanitizeBody = function(req, res, next) {
	//loops through each key in the body
	for (var key in req.body) {
		//changes the key to match a sanitized version of itself
		req.body[key] = req.sanitize(req.body[key]);
	}
	//calls the next function
	next();
};

//exports the middleware object
module.exports = middlewareObj;
