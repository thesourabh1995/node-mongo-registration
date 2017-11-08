var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
const url = "mongodb://localhost:27017/testMongo";

MongoClient.connect(url,function(err,db){
  if(err){
     return console.log(err);
  }
 try{
    assert.equal(null,err);
    insertData(db,function(){
      db.close();
    });
  }
 catch(e){
    console.log('This will never be called! Error ' + e.message);
 }
});

var insertData = function(db,callback){
  db.collection('testData').insertOne({
    "name":"Sourabh",
    "email":"sourabh@gmail.com",
    "mob" : "11122334444"
  }, function(err){
    assert.equal(err,null);
    console.log("Inserted successfully!!");
    callback();
  });
};
