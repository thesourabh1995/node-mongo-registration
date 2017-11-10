var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

var encrypt = function(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

var decrypt = function(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

var validateEmail = function (email) {
    var flag = true;
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    var isSpace = email.indexOf(" ");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length || isSpace != -1) {
        flag = false;
    }
    return flag;
}

module.exports = {
    encrypt: encrypt,
    decrypt : decrypt,
    validateEmail:validateEmail
};
