var app = angular.module('myApp',[]);
app.controller('loginControl', function($scope,$http,$window,$log){

   var user = new Object();
   $scope.login = function(){
      user.email = $scope.email;
      user.passkey = $scope.passkey;
      var validTemp = validateDataLogin(user);
      if(!validTemp['isValid']){
        alert(validTemp['errTxt']);
        return false;
      }

      $http.post('/loginUser', user).then(function(res){
        if(res.status == 200){
          // console.log(res);
          alert(res.data);
        }else {
          alert("Error While Registration!");
        }

        $scope.name = $scope.email = $scope.mobile = $scope.passkey = '';
      });
   }

   $scope.regisPage = function(){
     var url = "http://" + $window.location.host + "/registration";
     $log.log(url);
     $window.location.href = url;
   }
});

function validateDataLogin(data){
    var isValid = true;
    var errTxt = '';
    var rtrnArr = new Array();
    if(!data.email){
      isValid = false;
      errTxt = "Please Fill Email Id";
    }else if(!data.passkey){
      isValid = false;
      errTxt = "Please Fill Password";
    }

    if(isValid && data.email){
      if(!common.validateEmail(data.email))
          isValid = false;
      errTxt = "Invalid Email!";
    }

    rtrnArr['errTxt'] = errTxt;
    rtrnArr['isValid'] = isValid;
    return rtrnArr;
}
