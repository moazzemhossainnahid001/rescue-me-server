const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(express.json());
app.use(cors());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xylkmyu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    try {

        await client.connect();

        const helpCollection = client.db("RescueMe").collection("Helps");



        // Post Helps
        app.post('/helps', async (req, res) => {
            const help = req.body;
            const result = await helpCollection.insertOne(help);
            res.send(result);
        })

        // Get Helps
        app.get('/helps', async (req, res) => {
            const query = {};
            const orders = helpCollection.find(query);
            const result = await orders.toArray();
            res.send(result);
        })

        // Delete Help
        app.delete('/helps/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await helpCollection.deleteOne(query);
            res.send(result);
        })

        // Get Help by id
        app.get('/helps/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await helpCollection.findOne(filter);
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