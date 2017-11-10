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

var loginPage = function(req, res){
  res.sendFile(path.join(__dirname + '../..','/html/login.html'));
}

var userDetails = function(req, res){
  res.sendFile(path.join(__dirname + '../..','/html/userDetails.html'));
}

var loginUser = function(req,res){
  var userDetails = req.body;
  MongoClient.connect(dbPath.url,function(err,db){
    if(err){
       return console.log(err);
    }try{
      assert.equal(null,err);
      var pass = util.encrypt(userDetails.passkey);
      var emailCnt = 0;
      var resObj = new Object();
      db.collection('user_master').find({email:userDetails.email,password:pass}).count(function(err,result){
        if(result){
          // db.collection('user_master').findOne({email:userDetails.email,password:pass}, function(err1,res1){
          //   if (err1)
          //       return console.log(err1);
          //   resObj = res1;
          //   console.log(resObj)
          //   console.log("res-")
          //   console.log(res1)
          // });
          // res.setHeader('Content-Type', 'application/json');
          // return res.status(200).json(resObj);
          return res.status(200).send("Welcome! You Are Logged In");
        }else{
          return res.status(200).send('Not Registered!! Please Register First');
        }
      });
    }catch(e){
      console.log('This will never be called! Error ' + e.message);
      return res.status(500);
    }
  });
}

module.exports = {
    loginPage: loginPage,
    loginUser:loginUser,
    userDetails:userDetails
};
