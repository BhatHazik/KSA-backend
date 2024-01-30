const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const handleLogin = require('./Controllers/Login');


const app = express();
const port = 5000;
const url = 'mongodb://localhost:27017/ksa'



app.use(cors);
app.use(bodyParser.json());


try {
    const connect = mongoose.connect(url);

    if(connect){
        console.log('message : Dbconnected ');

    }
    
}

catch(error){
    console.log(error)
}


app.post('/login', handleLogin);


app.listen(port, ()=>{
    console.log(`server is running on port ${url}`)
});