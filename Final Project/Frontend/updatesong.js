import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
const UpdateSong = () => {
	let navigate = useNavigate();
	const [query, setQuery] = useState('');

	const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [formData, setFormData] = useState({
		id: 1,
		title: '',
		albumTitle: '',
		name: ''
	});

	const handleShow = (id) =>{
		formData.id = id;
		console.log(formData.id);
		setShow(true)
    }

    const handleUpdate = (event) =>{
		if(formData.id){
			fetch(`http://localhost:27017/updateitem/${formData.id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
                {
					"id": formData.id,
                    "title": formData.title,
					"albumtitle": formData.albumTitle,
					"name": formData.name
                }
            )
        })
		}
        fetchData();
    }
	const handleArtistUpdate = (event) =>{
		formData.name = event.target.value;
		console.log(formData.name);
    }
	const handleAlbumUpdate = (event) =>{
		formData.albumTitle = event.target.value;
		console.log(formData.albumTitle);
    }
	const handleTitleUpdate = (event) =>{
		formData.title = event.target.value;
		console.log(formData.title);
    }
	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = (id) => {
		fetch(`http://localhost:27017/deleteItem/${id}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Item deleted:', data);
				fetchData();
			})
			.catch((error) => console.error('Error deleting item:', error));
	};
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
					src={track.album.cover_big}
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
					<div className="d-flex justify-content-center">
						<button style={{
								width: '50px',
								height: '50px',
								objectFit: 'cover',
							}} 
							type="button" class="btn btn-danger rounded-circle btn-sm mx-2" onClick={() => handleDelete(track.id)}>-</button>
							<button style={{
								width: '50px',
								height: '50px',
								objectFit: 'cover',
							}} 
							type="button" class="btn btn-warning rounded-circle btn-sm mx-2" onClick={() => handleShow(track.id)}>
							
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
								<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
								</svg>
							</button>
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
							<b>My Song Collection</b>
						</h4>
					</div>
					
					<div className="col-lg-6 d-flex justify-content-end">
						
						<button
							type="button"
							className="btn btn-md btn-primary m-1"
							onClick={() => navigate('/')}
						>
							Return
						</button>
					</div>
				</div>
			</div>
			<div className="album py-5 bg-light">
				<div className="row justify-content-center">
						<div className="col-md-6 text-center">
							<h3 className="mb-3">Update Your Songs</h3>
						</div>
					</div>
				<div className="container">
					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 row-lg-12">
						{listItems}
					</div>
				</div>
				<Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Song Attributes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id = "titleForm">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Song Title</Form.Label>
                        <Form.Control
                            type="price"
                            placeholder=""
							onChange={handleTitleUpdate}
                        />
                        </Form.Group>
                    </Form>
					<Form id = "albumtitleForm">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Album Name</Form.Label>
                        <Form.Control
                            type="price"
                            placeholder=""
							onChange={handleAlbumUpdate}
                        />
                        </Form.Group>
                    </Form>
					<Form id = "artistnameForm">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Artists Name</Form.Label>
                        <Form.Control
                            type="price"
                            placeholder=""
							onChange={handleArtistUpdate}
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
		</div>
	);
};

export default UpdateSong;
