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

module.exports = {
    calenderView: calenderView,
};
