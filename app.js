var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var crypto = require('crypto');
const url = "mongodb://localhost:27017/mongoTestdb";
app.use(express.static(path.join(__dirname, 'css')));
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));
const port = 8000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var server = http.createServer(app);
app.get('/registration',function(req, res ){
  res.sendFile(__dirname + '/html/registration.html');
});

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

app.post('/regisAPI',function(req, res ){
  // console.log(req.body);
  var userDetails = req.body;
  MongoClient.connect(url,function(err,db){
    if(err){
       return console.log(err);
    }
   try{
      assert.equal(null,err);
      var passHash = encrypt(userDetails.passkey);
      var emailCnt = 0;
      db.collection('user_master').find({email:userDetails.email}).count(function(err,result){

        if(!rowCnt){
          db.collection('user_master').insertOne({
            "name":userDetails.name,
            "email":userDetails.email,
            "mob" : userDetails.mob,
            "password": passHash
          }, function(err){
            assert.equal(err,null);
            console.log("Inserted successfully!!");
            return res.status(200).send('Inserted successfully!!');
          });
        }else{
          return res.status(200).send('Email id already Exist!!');
        }
      });
    }catch(e){
      console.log('This will never be called! Error ' + e.message);
      return res.status(500);
   }
  });

});

server.listen(port);
