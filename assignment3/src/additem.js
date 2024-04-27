import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';

const AddItem = () => {
	let navigate = useNavigate();
	const { state } = useLocation();
	const [cartTotal, setCartTotal] = useState(0);
	const [formData, setFormData] = useState({
		id: '',
		title: '',
		price: '',
		description: '',
		category: '',
		image: '',
		rate: '',
		count: '',
	});

	useEffect(() => {}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		console.log(formData);
		fetch('http://localhost:27017/addItem', {
			method: 'POST',
			body: JSON.stringify({
				id: parseInt(formData.id),
				title: formData.title,
				price: formData.price,
				description: formData.description,
				category: formData.category,
				image: formData.image,
				rating: { rate: formData.rate, count: formData.count },
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then((response) => response.json());
	};

	return (
		<div>
			<div class="container">
				<div class="row justify-content-between ">
					<div class="col-2 align-self-center">
						<h4>
							<b>Snow Sports Catalogue</b>
						</h4>
					</div>
					<div class="col-2 align-self-center">
						<button
							type="button"
							class="btn btn-md btn-primary"
							onClick={() => navigate('/')}
						>
							Return
						</button>
					</div>
				</div>
			</div>
			<div class="container my-5">
				<h3>Create New Item</h3>
				<form>
					<div class="row justify-content-around">
						<div class="col mb-3">
							<label for="validationDefault01">Id</label>
							<input
								type="text"
								class="form-control"
								id="validationDefault01"
								placeholder="Id"
								value={formData.id}
								name="id"
								onChange={handleInputChange}
								required
							/>
						</div>
						<div class="col mb-3">
							<label for="validationDefault02">Title</label>
							<input
								type="text"
								class="form-control"
								id="validationDefault02"
								placeholder="Title"
								value={formData.title}
								name="title"
								onChange={handleInputChange}
								required
							/>
						</div>
						<div class="col mb-3">
							<label for="validationDefault02">Price</label>
							<input
								type="text"
								class="form-control"
								id="validationDefault02"
								placeholder="Price"
								value={formData.price}
								name="price"
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col mb-3">
							<label for="validationDefault01">Description</label>
							<textarea
								type="text"
								class="form-control"
								id="validationDefault01"
								placeholder="..."
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								rows="3"
								required
							/>
						</div>
					</div>
					<div class="row justify-content-around">
						<div class="col mb-3">
							<label for="validationDefault01">Category</label>
							<input
								type="text"
								class="form-control"
								id="validationDefault01"
								placeholder="Men's clothing, Jewelry, ..."
								name="category"
								value={formData.category}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div class="col mb-3">
							<label for="validationDefault02">Image</label>
							<input
								type="text"
								class="form-control"
								id="validationDefault02"
								placeholder="Ex: https://(website).jpg"
								name="image"
								value={formData.image}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div class="row justify-content-center">
						<h6>Rating Information</h6>

						<div class="col-md-6 mb-3">
							<label for="validationDefault03">Rating</label>
							<input
								type="text"
								class="form-control"
								id="validationDefault03"
								placeholder="out of 5.0"
								name="rate"
								value={formData.rating}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div class="col-md-6 mb-3">
							<label for="validationDefault03">Count</label>
							<input
								type="text"
								class="form-control"
								id="validationDefault03"
								placeholder="Number of ratings"
								name="count"
								value={formData.rating}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div class="text-center my-2">
						<button
							class="btn btn-primary justify-content-center"
							type="submit"
							onClick={handleSubmit}
						>
							Submit New Item
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddItem;
