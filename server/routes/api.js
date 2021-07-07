// DATABASE CONNECTION HAPPENS IN THE API.JS FILE

//Import express and router
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');//import user from models
const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/eventsdb";

// conect to db
mongoose.connect(db, err => {
    if(err){
        console.error('Error' + err);
    }
    else{
        console.log('Connected to mongodb')
    }
});

//middleware
function verifyToken(req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

router.get('/',(req, res) => {
    res.send('From API route');
});

//post request to end pointer
router.post('/register',(req, res) =>{
    //request user info from request body
    let userData = req.body;
    //create new user model that mongoose underatand
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error){
            console.log(error);
        }
        else{
            //generate json web token
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});//send token as an object
        }
    });
});

//create login api
router.post('/login',(req, res) => {
    let userData = req.body;

    User.findOne({email: userData.email},(error, user) => {
        if(error){
            console.log(error);
        }
        else{
            if(!user){
                res.status(401).send('Invalid email');
            }
            else{
                if(user.password != userData.password){
                    res.status(401).send('Invalid password');
                }
                else{
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    });

});

//create the apis to fetch regular and special events
router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })
  
  router.get('/special',verifyToken, (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })
  
//finally export the route
module.exports = router;