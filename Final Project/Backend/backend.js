const { MongoClient } = require('mongodb');

var express = require('express');
var cors = require('cors');
var app = express();
var fs = require('fs');
app.use(cors());
// MongoDB
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'songs';
const client = new MongoClient(url);
const db = client.db(dbName);

var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
const port = '27017';
const host = 'localhost';
app.listen(port, () => {
	console.log('App listening at http://%s:%s', host, port);
});

const axios = require('axios');

app.get('/search/:song', async (req, res) => {
	const trackName = req.params.song;
	console.log('searching for ' + trackName);
	const response = await axios.get(
		`https://api.deezer.com/search?q=track:"${trackName}"`
	);
	console.log(response.data.data);
	res.json(response.data.data);
});

app.post('/addsong', async (req, res) => {
	const songData = req.body;
	const result = await db.collection('songs').insertOne(songData);
	console.log('Song added to MongoDB:' + songData);
	res.status(200).json({ message: 'Song added successfully' });
});

app.get('/listItems', async (req, res) => {
	await client.connect();
	console.log('Node connected successfully to GET MongoDB');
	const query = {};

	const results = await db.collection('songs').find(query).limit(100).toArray();

	console.log(results);
	res.status(200);
	res.send(results);
});
app.delete('/deleteItem/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		await client.connect();
		console.log('item to delete :', id);
		const query = { id: id };
		const itemToDelete = await db
			.collection('songs')
			.findOne(query);

		const results = await db.collection('songs').deleteOne(query);

		if (results.deletedCount === 0) {
			res.status(404).send({ message: 'Item not found' });
			return;
		}

		res.status(200).send({
			message: 'Item deleted successfully',
			deletedItem: itemToDelete,
		});
	} catch (error) {
		console.error('Error deleting item:', error);
		res.status(500).send({ message: 'Internal Server Error' });
	}
});


app.put('/updateItem/:id', async (req, res) => {
	const id = Number(req.params.id);
	const query = { id: id };

	await client.connect();
	console.log('item to Update :', id);

	// Data for updating the document, typically comes from the request body
	console.log(req.body);

	// read data from item to update to send to frontend
	const itemUpdated = await db.collection('songs').findOne(query);

	const updateData = {
		$set: {
			title: req.body.title,
			"artist.name":  req.body.name
			,
			"album.title": req.body.albumtitle
		},
	};
	// Add options if needed, for example { upsert: true } to create a document if it doesn't exist
	const options = {};
	const results = await db
		.collection('songs')
		.updateOne(query, updateData, options);

	if (results.matchedCount === 0) {
		return res.status(404).send({ message: 'item not found' });
	}
	res.status(200);
	res.send(itemUpdated);
});


