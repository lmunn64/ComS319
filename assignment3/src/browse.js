import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
	useLocation,
} from 'react-router-dom';


const Browse = () => {
	var items
	const { state } = useLocation();
	let navigate = useNavigate();
	const [query, setQuery] = useState('');
	const [cart, setCart] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
			fetchData();
	}, []);

	const fetchData = async () => {
		try{
			const response = await fetch("http://localhost:27017/listItems")
			const result = await response.json();
			setData(result)
			console.log(result)
		} catch (error){
			console.error('Error fetching data: ', error)
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
							<strong><strong>{el.id}. </strong></strong>
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

	const cartItems = cart.map((el) => (
		<div key={el.id}>
			<img
				className="img-fluid"
				src={el.image}
				alt={el.title}
				width={50}
			/>
			{el.title}${el.price}
		</div>
	));

	return (
		<div>
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-2 align-self-center">
						<h4>
							<b>Fake Store Catalogue</b>
						</h4>
					</div>
					<div className="col-md-auto col-md-4 align-self-center">
						<input
							className="form-control"
							type="text"
							placeholder="Search for items by id..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
					<div className="col-2 align-self-center">
						<button
							type="button"
							className="btn btn-md btn-primary"
							onClick={() => navigate('/additem')}
						>
							Add item
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
