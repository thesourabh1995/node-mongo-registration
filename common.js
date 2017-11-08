this.validateEmail = function (email) {
    var flag = true;
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    var isSpace = email.indexOf(" ");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length || isSpace != -1) {
        flag = false;
    }
    return flag;
};
