import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
	let navigate = useNavigate();
	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = async () => {
		try {
			const response = await axios.get(
				`http://localhost:27017/search/${searchInput}`
			);
			setSearchResults(response.data);
			console.log(searchResults);
		} catch (error) {
			console.error('Error fetching data: ', error);
		}
	};

	const handleAddToMongoDB = async (track) => {
		console.log(JSON.stringify(track));

		const response = await fetch('http://localhost:27017/addsong', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(track),
		});
		const data = await response.json();
		console.log(data);
	};

	return (
		<div>
			<div className="container">
				<div className="row justify-content-between align-items-center">
					<div className="col-2">
						<h4>
							<b>My Song Collection</b>
						</h4>
					</div>
					<div className="col-md-auto col-md-4"></div>
					<div className="col-lg-6 d-flex justify-content-end">
						<div className="col-2 align-self-center">
							<button
								type="button"
								className="btn btn-md btn-primary"
								onClick={() => navigate('/')}
							>
								Return
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="album py-5 bg-light">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-6">
							<h3 className="mb-3">Search For Songs</h3>
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Search for songs"
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
								/>
								<button
									className="btn btn-primary"
									onClick={handleSearch}
									type="button"
								>
									Search
								</button>
							</div>
						</div>
					</div>
					<div className="row mt-4">
						{searchResults &&
							searchResults.map((track) => (
								<div
									key={track.id}
									className="col-12 col-md-6 col-lg-4 mb-4"
								>
									<div className="card h-100">
										<br />
										<img
											src={track.album.cover_big}
											className="card-img-top"
											alt={track.title}
											style={{
												height: '300px',
												width: 'auto',
												objectFit: 'cover',
												boxShadow: '12px 14px 6px rgba(0, 0, 0, 0.2)',
												border: '0.35rem solid white',
												borderRadius: '8px',
											}}
										/>
										<div className="card-body">
											<h5 className="card-title">{track.title}</h5>
											<p className="card-text">Artist: {track.artist.name}</p>
											<p className="card-text">Album: {track.album.title}</p>
											<div className="d-flex align-items-center">
												<img
													src={track.artist.picture}
													className="img-thumbnail rounded-circle"
													alt={track.artist.name}
													style={{
														width: '50px',
														height: '50px',
														objectFit: 'cover',
													}}
												/>
												<audio
													controls
													className="flex-grow-1 ml-3"
												>
													<source
														src={track.preview}
														type="audio/mp3"
													/>
													Your browser does not support the audio element.
												</audio>
											</div>

											<button
												className="btn btn-primary mt-3"
												onClick={(e) => {
													e.target.classList.toggle('btn-primary');
													e.target.classList.toggle('btn-success');
													handleAddToMongoDB(track);
												}}
											>
												Add to Collection
											</button>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddItem;
