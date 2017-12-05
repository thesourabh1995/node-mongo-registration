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

var calenderView = function(req, res){
  res.sendFile(path.join(__dirname + '../..','/html/calender_view2.html'));
}

var calenderCover = function(req,res){
  var details = req.body;
  MongoClient.connect(dbPath.url,function(err,db){
    if(err){
       return console.log(err);
    }try{
      assert.equal(null,err);
      db.collection('seat_cover').update({'userid':details.userid},{$set:{'active_flag': 2}});
      db.collection('seat_cover').insertOne({
        "userid":details.userid,
        "seat":details.seat,
        "date_time" : details.curDate,
        "active_flag": 1
      },function(err){
        assert.equal(err,null);
        console.log("updation and insertion successfully!!");
        return res.status(200).send('Booking time starts!!');
      });
    }catch(e){
      console.log('This will never be called! Error ' + e.message);
      return res.status(500);
    }
  });
}

module.exports = {
    calenderView: calenderView,
    calenderCover:calenderCover
};
