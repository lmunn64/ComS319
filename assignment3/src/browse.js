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
		return el.id.toString().includes(query);
	});

	const listItems = filteredItems.map((el) => (
		<div
			className="col"
			key={el.id}
		>
			<div className="card shadow-sm h-70">
				<img
					src={el.image}
					alt={el.title}
				/>
				<div className="card-body">
					<p className="card-title text-center">
						<strong>
							<strong>{el.id}. </strong>
						</strong>
						<strong>{el.title}</strong>
					</p>

					<div className="col text-center my-2">
						<span className="badge bg-primary">${el.price}</span>
						<span className="badge bg-secondary">{el.category}</span>
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
							<b>Fake Store Catalogue</b>
						</h4>
					</div>
					<div className="col-md-auto col-md-4">
						<input
							className="form-control"
							type="text"
							placeholder="Search for items by id..."
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
							Add item
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
