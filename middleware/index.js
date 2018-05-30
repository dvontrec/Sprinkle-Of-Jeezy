//creates an object to store the middleware functions
var middlewareObj = {};

//********************************
//		MiddleWare
//********************************
//checks to see if the current session is logged in
middlewareObj.isLoggedIn = function(req, res, next)
{
	//checks to see if the request is from an authenticated user
	if(req.isAuthenticated())
	{
		//moves on to the next function.  usually the callback
		return next(); 
	}

	//if the user is not authenticated we will continue.  No need for an else because we return if conditions are met
	res.redirect("/login");
}

middlewareObj.isAdmin = function(req, res, next)
{
	//checks to see if the request is from an authenticated user
	if(req.isAuthenticated())
	{
		//moves on to the next function.  usually the callback
		return next(); 
	}

	//else only show the json of quotes
	else
	{
		res.redirect("/api/quotes")
	}
}


module.exports = middlewareObj;