import React, { useState, useEffect } from 'react';
import items from './products.json';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
	useLocation,
} from 'react-router-dom';

const Browse = () => {
	const { state } = useLocation();
	let navigate = useNavigate();
	const [query, setQuery] = useState('');
	const [cart, setCart] = useState([]);

	useEffect(() => {
		if (state != null) {
			state.cartstate.forEach((item) => {
				createCart(item);
			});
		}
		console.log(cart);
	}, [state]);

	const addToCart = (el, bool) => {
		let id = el.id;
		let existingItem = cart.find((item) => item.id === id);
		if (existingItem) {
			if (bool) {
				existingItem.quantity += 1;
			}
			setCart(cart.map((item) => (item.id === id ? existingItem : item)));
		} else {
			el.quantity = 1;
			setCart([...cart, el]);
		}
	};

	const removeFromCart = (el) => {
		let existingItem = cart.find((item) => item.id === el.id);
		if (existingItem && existingItem.quantity > 1) {
			existingItem.quantity -= 1;
			setCart(cart.map((item) => (item.id === el.id ? existingItem : item)));
		} else {
			setCart(cart.filter((item) => item.id !== el.id));
		}
	};

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

	function createCart(el) {
		addToCart(el, false);
	}

	const filteredItems = items.filter((el) => {
		return el.title.toLowerCase().includes(query.toLowerCase());
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
					<p className="card-title">
						<strong>{el.title}</strong>
					</p>
					<div className="col text-center my-2">
						<span className="badge bg-primary">${el.price}</span>
					</div>
					<div className="d-flex justify-content-center align-items-center">
						<div className="btn-group">
							<button
								type="button"
								className="btn btn-secondary"
								onClick={() => removeFromCart(el)}
							>
								{' '}
								-{' '}
							</button>{' '}
							<button
								type="button"
								className="btn btn-secondary"
								onClick={() => addToCart(el, true)}
							>
								{' '}
								+{' '}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	));

	return (
		<div>
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-2 align-self-center">
						<h4>
							<b>Snow Sports Catalogue</b>
						</h4>
					</div>
					<div className="col-md-auto col-md-4 align-self-center">
						<input
							className="form-control"
							type="text"
							placeholder="Search for items..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
					<div className="col-2 align-self-center">
						<button
							type="button"
							className="btn btn-md btn-primary"
							onClick={() => navigate('/cart', { state: { cart_state: cart } })}
						>
							Checkout
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
