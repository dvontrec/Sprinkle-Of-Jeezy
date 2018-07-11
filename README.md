# [Sprinkle of Jeezy](https://sprinkle-of-jeezy.herokuapp.com/)
******************************************************************
						Description
******************************************************************

ME_N stack application that displays rap quotes from a backend MONGO database. None registered users can also submit suggestion quotes that can be added after review.  

******************************************************************
						Prerequisite
******************************************************************
- MongoDB
- Node 
- NPM

******************************************************************
						Initial Setup
******************************************************************
To install you must make sure all dependencies are insttalled.  To do this run "npm install"
Then needs the following environment vars set:

PORT: (enter a 4 digit port number here) Defaults to 8000

SECRET: (enter a string) ex "This is not my secret" <b>Required</b>

DATABASEURL: (enter hosted database here) Defaults to "mongodb://localhost/sprinkle"

******************************************************************
						Running Project
******************************************************************
To run the project run "npm start"

******************************************************************
						Important notes
******************************************************************
In order to add or delete quotes you must be logged in.  If you are using the code louisville build authentication is disabled.  You will automatically be given the abilty to perform these tasks.  

If you are a guest you can suggest new quotes via the backend by clicking the submit quotes button.  




