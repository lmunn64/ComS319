const { MongoClient } = require("mongodb");

var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");

// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
const port = "27017";
const host = "localhost";
app.listen(port, () => {
console.log("App listening at http://%s:%s", host, port);
});

app.get("/listItems", async (req, res) => {

    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};

    const results = await db
        .collection("fakestore_catalog")
        .find(query)
        .limit(100)
        .toArray();

    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/:id", async (req, res) => {
    const itemid = Number(req.params.id);
    console.log("Item to find :", itemid);
    
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": itemid };

    const results = await db.collection("fakestore_catalog")
    .findOne(query);
    console.log("Results :", results);
    
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

app.post("/addItem", async (req, res) => {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const newDocument = {
        "id": values[0],
        "name": values[1],
        "price": values[2],
        "description": values[3],
        "imageUrl": values[4]
    };
    console.log(newDocument)
    
    try {
        const results = await db
        .collection("fakestore_catalog")
        .insertOne(newDocument);
        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
    
}
);

app.delete("/deleteItem/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("item to delete :",id);
        const query = { id: id };

        // read data from item to delete to send it to frontend
        const itemDeleted = await db.collection("fakestore_catalog").findOne(query);

        // delete
        const results = await db.collection("fakestore_catalog").deleteOne(query);
        res.status(200);

        res.send(itemDeleted);
    }
    catch (error){
        console.error("Error deleting item:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.put("/updateItem/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };

    await client.connect();
    console.log("item to Update :",id);
    
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    
    // read data from item to update to send to frontend
    const itemUpdated = await db.collection("fakestore_catalog").findOne(query);
    
    const updateData = {
        $set:{
            "name": req.body.name,
            "price": req.body.price,
            "description": req.body.description,
            "imageUrl": req.body.imageUrl
        }
    };
    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = { };
    const results = await db.collection("fakestore_catalog").updateOne(query, updateData, options);
    
    if (results.matchedCount === 0) {
        return res.status(404).send({ message: 'item not found' });
    
    }
    res.status(200);
    res.send(itemUpdated);
    });