var common = new Common ();

function Common () {
  var _this = this;
  var input_selector =
    'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea, input[type=radio]';

  var $toastlast = '';

  this.validateEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test (email);
  };

  this.curDateFormated = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var hh = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }if(mm<10){
        mm='0'+mm;
    }if(hh<10){
        hh='0'+hh;
    }if(m<10){
        m='0'+m;
    }if(s<10){
        s='0'+s;
    }
    return today = yyyy+'/'+mm+'/'+dd +' '+hh+':'+m+':'+s ;
  };
}
