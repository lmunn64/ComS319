async function searchSong() {
	const trackName = document.getElementById('searchInput').value;
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = `https://api.deezer.com/search?q=track:"${trackName}"`;
	const response = await fetch(proxyUrl + apiUrl);
	const data = await response.json();
	console.log(data);
	displaySearchResults(data.data);
}

function displaySearchResults(data) {
	const searchResultsElement = document.getElementById('searchResults');
	searchResultsElement.innerHTML = '';

	data.forEach((track) => {
		const trackElement = document.createElement('div');

		trackElement.id = track.id;
		trackElement.innerHTML = `
		<div class="d-flex align-items-stretch">
		<div class="row">
			<div class="col-md-4">
				<h3>${track.title}</h3>
				<img src="${track.album.cover}" alt="Album Cover"/>
				<p>Album: ${track.album.title}</p>
			</div>
			<div class="col-md-4">
				<audio controls>
					<source src="${track.preview}" type="audio/mp3">
					Your browser does not support the audio element.
				</audio>
			</div>
			<div class="col-md-4">
				<p>Artist: ${track.artist.name}</p>
				<img src="${track.artist.picture}" alt="Artist Picture"/>
			</div>
			<div class="col-md-4">
				<button class="btn btn-primary" onclick="addToCollection(${track.id})">+</button>
			</div>
		</div>
	</div>
	
	`;

		searchResultsElement.appendChild(trackElement);
	});
}

const idCollection = [];
const collection = [];

async function addToCollection(trackId) {
	if (!idCollection.includes(trackId)) {
		idCollection.push(trackId);
		try {
			// Fetch detailed information of the track using its ID
			const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
			const trackUrl = `https://api.deezer.com/track/${trackId}`;
			const response = await fetch(proxyUrl + trackUrl);
			if (!response.ok) {
				throw new Error('Failed to fetch track data');
			}
			const trackData = await response.json();

			// Add the trackObj instance to the collection
			collection.push(trackData);

			console.log('Song added: ', trackData);
		} catch (error) {
			console.error('Error adding song to collection: ', error);
		}
		console.log('Current collection: ', collection);
	} else {
		console.log('song in collection already');
	}
}
