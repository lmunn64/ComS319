import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
	const { state } = useLocation();
	const { orderDetails, paymentInfo, shippingInfo } = state;
	const navigate = useNavigate();

	const handleReturnHome = () => {
		navigate('/');
	};

	return (
		<div
			className="container-fluid py-5"
			style={{ backgroundColor: '#f8f9fa' }}
		>
			<div className="container bg-white p-5 rounded shadow">
				<h2 className="text-center mb-4">Order Confirmation</h2>
				<div className="text-center mt-4">
					<button
						className="btn btn-primary"
						onClick={handleReturnHome}
					>
						Continue Shopping
					</button>
				</div>
				<div className="row mt-4 mb-4">
					<div className="col-md-6">
						<div className="card p-4">
							<h3>Shipping Information</h3>
							<p>
								<strong>Name:</strong> {shippingInfo.firstName}{' '}
								{shippingInfo.lastName}
							</p>
							<p>
								<strong>Address:</strong> {shippingInfo.address1},{' '}
								{shippingInfo.address2}
							</p>
							<p>
								<strong>City:</strong> {shippingInfo.city}
							</p>
							<p>
								<strong>State:</strong> {shippingInfo.state}
							</p>
							<p>
								<strong>ZIP:</strong> {shippingInfo.zip}
							</p>
						</div>
					</div>

					<div className="col-md-6">
						<div className="card p-4">
							<h3>Payment Information</h3>
							<p>
								<strong>Credit Card:</strong> {paymentInfo.creditCard}
							</p>
						</div>
					</div>
				</div>

				<hr className="my-4" />

				<div>
					<h3>Order Details</h3>
					{orderDetails.map((item, index) => (
						<div
							key={index}
							className="card mb-3 p-3"
						>
							<div className="row g-0">
								<div className="col-md-4">
									<img
										src={item.image}
										className="img-fluid rounded"
										alt={item.title}
									/>
								</div>
								<div className="col-md-8">
									<div className="card-body">
										<h5 className="card-title">{item.title}</h5>
										<p className="card-text">
											<strong>Quantity:</strong> {item.quantity}
										</p>
										<p className="card-text">
											<strong>Price:</strong> ${item.price}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
