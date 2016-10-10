(function() {
	var app = angular.module('recipe-holder', ['ui.bootstrap', 'ngRoute', 'underscore', 'ngTagsInput']);

	app.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'pages/activityPicker.html',
				controller  : 'mainController'
			})
			.when('/add', {
				templateUrl : 'pages/addRecipe.html',
				controller  : 'addController'
			})
			.when('/add/:id', {
				templateUrl : 'pages/addRecipe.html',
				controller  : 'addController'
			})
			.when('/view', {
				templateUrl : 'pages/viewRecipes.html',
				controller  : 'viewRecipesController'
			})
			.when('/view/:id', {
				templateUrl : 'pages/viewRecipe.html',
				controller  : 'viewRecipeController'
			});
	});

	app.controller('mainController', function($scope, page) {
		$scope.page = page;
	});
	
	app.filter('unsafe', function($sce) {
	    return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	});
})();

	



	

