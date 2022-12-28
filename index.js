const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(express.json());
app.use(cors());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t3cv0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    try {

        await client.connect();

        const helpCollection = client.db("RescueMe").collection("Helps");



        // Post Orders
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.send(result);
        })

        // Get Orders
        app.get('/orders', async (req, res) => {
            const query = {};
            const orders = ordersCollection.find(query);
            const result = await orders.toArray();
            res.send(result);
        })

        // Delete Order
        app.delete('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.send(result);
        })

        // Get order by id
        app.get('/order/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await ordersCollection.findOne(filter);
            res.send(result);
        })


    }
    finally {

    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Running Rescue Me Server");
});

app.listen(port, () => {
    console.log("Listen to Port", port);
});