const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 8000;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const dbPath = require('../mongodb_config.js');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var crypto = require('crypto');
var util = require('../util');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var server = http.createServer(app);

var homePage = function(req, res){
  res.sendFile(path.join(__dirname + '../..','/html/registration.html'));
}

var registerUser = function(req,res){
  var userDetails = req.body;
  MongoClient.connect(dbPath.url,function(err,db){
    if(err){
       return console.log(err);
    }try{
      assert.equal(null,err);
      var passHash = util.encrypt(userDetails.passkey);
      var emailCnt = 0;
      db.collection('user_master').find({email:userDetails.email}).count(function(err,result){
        if(!result){
          db.collection('user_master').insertOne({
            "name":userDetails.name,
            "email":userDetails.email,
            "mob" : userDetails.mob,
            "password": passHash
          },function(err){
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
}

module.exports = {
    homePage: homePage,
    registerUser : registerUser
};
