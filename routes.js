const express = require('express');
const router = express.Router();
const path = require('path');

var registApi = require('./controllers/registrationApi.js');
router.get('/registration', registApi.homePage);    //home page
router.post('/registerUser', registApi.registerUser);    //registeration API

var loginApi = require('./controllers/loginApi.js');
router.get('/login', loginApi.loginPage);    //login page
router.post('/loginUser', loginApi.loginUser);    //login page
router.get('/userDetails', loginApi.userDetails);    //login page

var bookingApi = require('./apis/bookingApi.js');
router.get('/calender', bookingApi.calenderView);
router.post('/coverSeat', bookingApi.calenderCover);

module.exports = router;
