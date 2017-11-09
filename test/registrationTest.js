var assert = require('assert');
var expect  = require("chai").expect;
var requestURL ="http://localhost:8000";
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var timeOut = 15000;

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


describe('/POST addUser', () => {
  it('addUser API', (done) => {
    let parameters = {
              name: "Sourabh",
              email: "44444@xelpmoc.in",
              mob : "9876543210",
              password: "sourabh123"
    }
    chai.request(requestURL)
       .post('/registerUser')
       .send(parameters)
       .end((err, res) => {
        console.log(res);
        done();
          // if(res.body['error'].errCode == 0){
          //    done();
          // }
        });
      });
    });
