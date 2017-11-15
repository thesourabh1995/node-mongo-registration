var app = angular.module('myApp', []);
app.controller('calenderView', function($scope) {
  $scope.action_onclick = function(seat,eve) {
    $scope.no_back = 'but-background';
    var info = new Object();
    info.seat = seat;
    info.curDate = common.curDateFormated();
    info.userid = '1233445';
    console.log(info);
    // $http.post('/coverSeat', info).then(function(res){
    // }
  };
});
