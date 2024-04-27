import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const UpdateItem = () =>{
    
	let navigate = useNavigate();
	const [query, setQuery] = useState('');
	const [price, setPrice] = useState('');
	const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
		id: 1,
		price: '',
	});

    const handleUpdate = (event) =>{
		console.log(price)
		setPrice(event.target.value)
		if(price && formData.id){
			fetch(`http://localhost:27017/updateitem/${formData.id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
                { 
                    "price": price,        
                }
            )
        })
		}
        
    }

    function setQueryAndId(e){
		setQuery(e)
		formData.id = e
		console.log(formData.id)
	}

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try{
			const response = await fetch("http://localhost:27017/listItems")
			const result = await response.json();
			setData(result)
			console.log(result)
            console.log(data[0].id)
            formData.id = data[0].id
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
            <script>formData.id = {el.id}</script>
            <div class="card " >
					<div className="card-body">
                        <div className="card shadow-sm">
                            <img  
                                src={el.image}
                                alt={el.title}
                            />
                            <div className="card-body">
                                <p className="card-title text-center">
                                    <strong><strong>{el.id}. </strong></strong>
                                    <strong>{el.title}</strong>
                                </p>                  
                            </div>
                        </div>
						<p className="card-title text-center">
							{el.description}
						</p>
                        <p className="card-title text-center">
							<strong>Rating: </strong>{el.rating.rate}/5 (from {el.rating.count} reviews)
						</p>
                        <div className="col text-center my-2">
                            <span className="badge bg-primary">${el.price}</span>
                            <span className="badge bg-secondary">{el.category}</span>
                        </div>
                        <div class = "col text-center my-4">
                            <button type = "button" class= "btn btn-md btn-danger" onClick={handleShow}>
                                Update Price
                            </button>
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
							<b>Fake Store Catalogue</b>
						</h4>
					</div>
					<div className="col-md-auto col-md-4 align-self-center">
						<input
							className="form-control"
                            id = "idForm"
							type="text"
							placeholder="Search for items by id..."
							value={query}
							onChange={(e) => setQueryAndId(e.target.value)}
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
            <h4 class = "text-center">Update an Item by Price:</h4>
				<div className="container my-4">
					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 row-lg-12 justify-content-center">
						{listItems[0]}
					</div>
				</div>
			</div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Price</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id = "priceForm">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Input Price</Form.Label>
                        <Form.Control
                            type="price"
                            placeholder="109.55"
							onChange={handleUpdate}
                        />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
		</div>
	);
}
 
export default UpdateItem;