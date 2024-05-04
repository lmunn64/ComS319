import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
	let navigate = useNavigate();
	const [query, setQuery] = useState('');

	const [data, setData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:27017/listItems');
			const result = await response.json();
			setData(result);
			console.log(result);
		} catch (error) {
			console.error('Error fetching data: ', error);
		}
	};

	const filteredItems = data.filter((el) => {
		console.log(el.title.toString());
		return el.title.toString().toLowerCase().includes(query.toLowerCase());
	});

	const listItems = filteredItems.map((track) => (
		<div
			className="col"
			key={track.id}
		>
			<div className="card h-100">
				<br />
				<img
					src={track.album.cover}
					className="card-img-top"
					alt={track.title}
					style={{
						height: '200px',
						width: 'auto',
						objectFit: 'cover',
						boxShadow: '12px 14px 6px rgba(0, 0, 0, 0.2)',
						border: '0.35rem solid white',
						borderRadius: '50px',
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
				</div>
			</div>
		</div>
	));

	return (
		<div>
			<div className="container">
				<div className="row justify-content-between align-items-center">
					<div className="col-2">
						<h4>
							<b>My Songs App</b>
						</h4>
					</div>
					<div className="col-md-auto col-md-4">
						<input
							className="form-control"
							type="text"
							placeholder="Search for songs in your collection..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
					<div className="col-lg-6 d-flex justify-content-end">
						<button
							type="button"
							className="btn btn-md btn-primary m-1"
							onClick={() => navigate('/additem')}
						>
							Add Songs
						</button>
						<button
							type="button"
							className="btn btn-md btn-primary m-1"
							onClick={() => navigate('/updateitem')}
						>
							Update Item
						</button>
						<button
							type="button"
							className="btn btn-md btn-primary m-1"
							onClick={() => navigate('/delete')}
						>
							Delete Item
						</button>
						<button
							type="button"
							className="btn btn-md btn-primary m-1"
							onClick={() => navigate('/about')}
						>
							Student Info
						</button>
					</div>
				</div>
			</div>
			<div className="album py-5 bg-light">
				<div className="container">
					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 row-lg-12">
						{listItems}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Browse;
