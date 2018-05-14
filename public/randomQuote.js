window.onload = function()
{
	getXHR();

}

function getXHR()
{
	const request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if(request.readyState === 4 && request.status === 200)
		{
			getQuote(JSON.parse(request.response));
		}
	}
	request.open("GET", "/api/quotes");
	request.send();
}

function getQuote(data)
{
	//generates a random number between 0(the first index of the data array) and the lendth of the data array
	var rNum = Math.floor(Math.random()*data.length);
	var text = data[rNum].quote;
	var artist = data[rNum].artist;
	document.getElementById("text").textContent = text;
	document.getElementById("artist").textContent = artist;
	console.log(text);
	return data[rNum]
	
	
}