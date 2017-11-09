const express = require('express');
const router = express.Router();
const path = require('path');

var registApi = require('./controllers/registrationApi.js');
router.get('/registration', registApi.homePage);    //home page
router.post('/registerUser', registApi.registerUser);    //registeration API

module.exports = router;
