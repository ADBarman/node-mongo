const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json())

//const rootCall = (req, res) => res.send('Thank you very much');

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });
//const users = ['asad', 'Moin', 'Susmita', 'Boka', 'Alo', 'Jam', 'Tesjpata'];


app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().limit(5).toArray((err, documents) =>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else {
                res.send(documents);
            }
        });
        client.close();
    });
    // const fruit = {
    //     product: 'ada',
    //     price: 220
    // }
    // res.send(fruit);
});

app.get('/banana', (req, res) => {
    res.send({fruit:'banana', quantity:1000, price:10000});
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.query.sort);
    const name = users[id];
    res.send({id,name});
    //res.send(name);
    //console.log(req.params.id);
})

//post

app.post('/addProduct', (req, res) => {
    //save to database
    const product = req.body;
    //user.id = 55;
    //console.log(user);
    //console.log(product);

    //database connection
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.insertOne(product, (err, result) =>{
            //console.log('Successfully Inserted', result);
            //res.send(result.ops[0]);
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else {
                res.send(result.ops[0]);
            }
        });
        //console.log('Database connected..');
        client.close();
    });
    //console.log('data received',req.body);
});

const port = process.env.PORT || 3000;
app.listen(port,() => console.log('Listening to port 3000'))