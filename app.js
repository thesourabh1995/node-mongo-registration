const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 8000;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const routes = require('./routes.js')
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var crypto = require('crypto');

app.use(express.static(path.join(__dirname, 'css')));
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var server = http.createServer(app);
app.use('/', routes);
server.listen(port);
