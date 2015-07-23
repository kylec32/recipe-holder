// create the module and name it scotchApp
var app = angular.module('recipe-holder', ['ui.bootstrap', 'ngAnimate']);

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});