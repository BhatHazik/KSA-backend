const express = require('express'); 
const mongoose =require('mongoose');      
const cors = require('cors');              
const bodyParser = require('body-parser');  
const handleRegister = require('./Controllers/Signup');
const handleLogin = require('./Controllers/Login');

require('dotenv').config();


const app = express();                      
const port =  2000; 
const url = 'mongodb://localhost:27017/Ksa'



app.use(cors());                            
app.use(bodyParser.json());  



try {
  const connect = mongoose.connect(url)

  if (connect) {
    console.log('message : Dbconnected ')
  }
}catch(error)
{
console.log (error)
}







app.post('/signup', handleRegister);
app.post('/login', handleLogin);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



