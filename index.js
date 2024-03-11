const express = require('express')
const server = express()
const mongoose = require('mongoose');
const port = process.env.PORT || 8000
require("./connection") 
const bodyParser = require('body-parser');
server.use(bodyParser.json());

server.use(express.json())   
server.use(express.urlencoded({extended:false}))

const productSchema = new mongoose.Schema({
    category: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      trim: true
    },
    desc: {
      type: String,
      trim: true
    }
  });
  
  const serviceSchema = new mongoose.Schema({
    service_title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    service_desc: {
      type: String,
      trim: true
    },
    service_img: {
      type: String,
      trim: true
    },
    price: {
      type: Number, 
      required: true
    },
    // Reference to Product collection
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  });

const Product = mongoose.model('Product', productSchema);
const Service = mongoose.model('Service', serviceSchema);

// CRUD APIs for Product
server.post('/products', async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // CRUD APIs for Service
  server.post('/services', async (req, res) => {
    try {
      const service = await Service.create(req.body);
      res.status(201).json(service);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Get all services with their associated product details
  server.get('/services', async (req, res) => {
    try {
      const services = await Service.find().populate('product');
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



// Listening to Server
const server_start = async ()=>{
    try{
        server.listen(port, ()=>{
            console.log(`The Server is listening on port no. ${port}`)
        })
    }
    catch(err){
        console.log(`Server cannot listen due to error ${err}`)
    }
}
server_start()