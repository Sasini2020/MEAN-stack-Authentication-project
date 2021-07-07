//Requiring the packages that have installed
const express = require('express');
const bodyParser = require('body-parser');

//require cors middleware
const cors = require('cors');

const PORT = 3000;
//require router
const api = require('./routes/api');
const app = express();//create an instance of express

app.use(cors());

//specify the body-parser to handle json data
app.use(bodyParser.json());
app.use('/api',api);
//add code to test get request
app.get('/',function(req, res){
    res.send('Hello from server');
});

app.listen(PORT, function(){ //to callback function
    console.log('Server running on localhost : ' + PORT);
});
