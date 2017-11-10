var app = angular.module('myApp',[]);
app.controller('regisController', function($scope,$http,$window,$log){
  // console.log($scope.name);
  console.log($scope)
  var user = new Object();
  $scope.submitData = function(){
    user.name = $scope.name;
    user.email = $scope.email;
    user.mob = $scope.mobile;
    user.passkey = $scope.passkey;
    var validTemp = validateData(user);
    if(!validTemp['isValid']){
      alert(validTemp['errTxt']);
      return false;
    }

    $http.post('/registerUser', user).then(function(res){
      if(res.status == 200){
        alert(res.data);
      }else {
        alert("Error While Registration!");
      }
      if(res.data.indexOf('already Exist') == -1)
          $scope.name = $scope.email = $scope.mobile = $scope.passkey = '';
    });
  }

  $scope.isNumber = function(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
    } else if (charCode == 13) {
        evt.preventDefault();
    }
    return true;
  }

  $scope.loginPage = function(){
    var url = "http://" + $window.location.host + "/login";
    $log.log(url);
    $window.location.href = url;
  }

});

function validateData(data){
    var isValid = true;
    var errTxt = '';
    var rtrnArr = new Array();
    if(!data.name){
      isValid = false;
      errTxt = "Please Fill Name";
    }else if(!data.email){
      isValid = false;
      errTxt = "Please Fill Email Id";
    }else if(!data.mob){
      isValid = false;
      errTxt = "Please Fill Mobile No";
    }else if(!data.passkey){
      isValid = false;
      errTxt = "Please Fill Password";
    }

    if(isValid && data.email){
      if(!common.validateEmail(data.email))
          isValid = false;
      errTxt = "Invalid Email!";
    }

    if(isValid && data.mob){
      var intRegex = /^[789]\d{9}$/;
      if(data.mob.length != 10 || intRegex.test(data.mob) === false){
        isValid = false;
        errTxt = "Invalid Mobile No!";
      }
    }

    rtrnArr['errTxt'] = errTxt;
    rtrnArr['isValid'] = isValid;
    return rtrnArr;
}
