var uri;
window.onload = function() {
	getXHR();
};

function getXHR() {
	const request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			getQuote(JSON.parse(request.response));
		}
	};
	request.open('GET', '/api/quotes');
	request.send();
}

function getQuote(data) {
	document.getElementById('text').textContent = data.quote;
	document.getElementById('artist').textContent = data.artist;
	console.log(data);
	if (!data.trackURI) {
		document.querySelector('#playButton').style.display = 'none';
	}
	uri = data.trackURI;
}

function playSong() {
	const request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			getQuote(JSON.parse(request.response));
		}
	};
	request.open('POST', `/api/spotify/play/${uri}`);
	request.send();
}
