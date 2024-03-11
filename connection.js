const mongoose = require('mongoose')

let compass = 'mongodb://127.0.0.1:27017/Products'
mongoose.connect(`${compass}` ,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{ 
    console.log("Connection to Database Successfull")})
.catch((err)=>{ 
    console.log(`Error due to ${err}`)})