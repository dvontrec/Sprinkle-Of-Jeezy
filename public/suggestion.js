//Waits until the page is loaded
$(document).ready(function(){
	getXHR()
})

//function used to creat an Ajax request using an  XMLHtpRequest
//input: Null
//output: Null
function getXHR()
{
	//creates the request
	const request = new XMLHttpRequest();

	//loops through the stages of the request
	request.onreadystatechange = function()
	{
		//if the request has been responded to and the status is 200(successful)
		if(request.readyState === 4 && request.status === 200)
		{
			//calls the Set Form function.  passing in the data from the XHR request
			setForms(JSON.parse(request.response));
		}
	}
	//creates a GET request to the suggestions route
	request.open("GET", "/api/suggestions/all");
	//sends the request
	request.send();
}

//function used to populate the Dom with a form for each request
//input: array of suggestions
//output: Null
function setForms(data)
{
	//loops through each suggestion gathered by the getXHR function and creates a form for confirming or denying them
	data.forEach(function(suggestion){
		$('#form-list')
		.append(`
			<div class="suggestion-form">
				<h3>${suggestion.quote}</h3>
				<div>
					<form action="/api/suggestions/${suggestion._id}?_method=DELETE" method="POST">
							<button>Delete</button>
					</form>
					<form action="/api/suggestions/confirm/${suggestion._id}" method="POST">
							<button>confirm</button>
					</form>
				</div>
			</div>`)
	});
	
}

