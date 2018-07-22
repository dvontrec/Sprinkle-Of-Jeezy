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
The .env file can be recieved by emailing dvontrec@gmail.com or contacting me via slack.  

******************************************************************
						Running Project
******************************************************************
To run the project run "npm start"

The Landing page will display random quotes along with the artists.  You can clicking the "New Quote" button.  The meat of the project is located in the "Back End".  There users can submit quotes or login/register.  New users must register which gives access to edit the quotes by clicking the "Get Quote" button. You can also accept or delete suggestions put in by guests.  

 ******************************************************************
						Important notes
******************************************************************
In order to add or delete quotes you must be logged in.  If you are using the code louisville build authentication is disabled for the registration route.  This means locally anyone can register as a new user. 

If you are a guest you can suggest new quotes via the backend by clicking the submit quotes button.  




