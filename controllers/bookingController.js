var app = angular.module('myApp', []);
app.controller('calenderView', function($scope) {
  $scope.action_onclick = function(seat) {
    $scope.no_back_23 = 'but-background';
    console.log($scope);
  };
});
