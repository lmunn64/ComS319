import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';

const DeleteItem = () => {
	let navigate = useNavigate();

	const [query, setQuery] = useState('');
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleClose = () => setShow(false);
	const handleShow = (item) => {
		setShow(true);
		setItemToDelete(item);
	};

	const handleDelete = () => {
		fetch(`http://localhost:27017/deleteItem/${itemToDelete.id}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Item deleted:', data);
				handleClose();
				fetchData();
			})
			.catch((error) => console.error('Error deleting item:', error));
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
	};

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:27017/listItems');
			const result = await response.json();
			setData(result);
			console.log(result);
			console.log(data[0]?.id);
		} catch (error) {
			console.error('Error fetching data: ', error);
		}
	};

	const filteredItems = data.filter((el) => {
		return el.id.toString().includes(query);
	});

	const currentItem = filteredItems[currentIndex];

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
							id="idForm"
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
							onClick={() => navigate('/')}
						>
							Return
						</button>
					</div>
				</div>
			</div>
			<div className="album py-4 bg-light">
				<h4 className="text-center">Delete an Item:</h4>
				<div className="container my-4">
					<div className="row justify-content-center">
						<div className="col-12">
							{currentItem && (
								<div className="card">
									<div className="card-body">
										<div className="card shadow-sm">
											<img
												src={currentItem.image}
												alt={currentItem.title}
											/>
											<div className="card-body">
												<p className="card-title text-center">
													<strong>{currentItem.id}. </strong>
													<strong>{currentItem.title}</strong>
												</p>
											</div>
										</div>
										<p className="card-title text-center">
											{currentItem.description}
										</p>
										<p className="card-title text-center">
											<strong>Rating: </strong>
											{currentItem.rating.rate}/5 (from{' '}
											{currentItem.rating.count} reviews)
										</p>
										<div className="col text-center my-2">
											<span className="badge bg-primary">
												${currentItem.price}
											</span>
											<span className="badge bg-secondary">
												{currentItem.category}
											</span>
										</div>
										<div className="col text-center my-4">
											<button
												type="button"
												className="btn btn-md btn-danger"
												onClick={() => handleShow(currentItem)}
											>
												Delete Item
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="row justify-content-center mt-3">
						<Button
							variant="primary"
							onClick={handlePrevious}
						>
							Previous
						</Button>
						<Button
							variant="primary"
							onClick={handleNext}
							className="ms-3"
						>
							Next
						</Button>
					</div>
				</div>
			</div>
			<Modal
				show={show}
				onHide={handleClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Item</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to delete this item?</p>
					<p>{itemToDelete && itemToDelete.title}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={handleDelete}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default DeleteItem;
