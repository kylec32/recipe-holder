	// create the module and name it scotchApp
	var app = angular.module('recipe-holder', ['ngRoute']);

	// configure our routes
	app.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/activityPicker.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/add', {
				templateUrl : 'pages/addRecipe.html',
				controller  : 'addController'
			})

			// route for the contact page
			.when('/view', {
				templateUrl : 'pages/viewRecipes.html',
				controller  : 'viewRecipesController'
			})
			.when('/view/:id', {
				templateUrl : 'pages/viewRecipe.html',
				controller  : 'viewRecipeController'
			});
	});

	// create the controller and inject Angular's $scope
	app.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

	app.controller('addController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	app.controller('viewRecipesController', function($scope,$http,$location) {

		$scope.recipes = [{title:"Title 1",url:"example.com",prep_time:"30",cook_time:"25",instructions:"These are instruction"},{title:"Title 2",url:"exampl2.com",prep_time:"50",cook_time:"35",instructions:"These are instructio2"}];
	
		 $http.get("/api/recipes").
		    success(function(data, status, headers, config) {
		      data.forEach(function(data) {
		        $scope.recipes.push(data);
		      })
		    });

		$scope.go = function(recipe) {
			console.log($location.url());

			$location.url("/view/"+recipe._id);
  			//$location.hash('#/view/' + recipe._id);
		};
	});

	app.controller('viewRecipeController', function($scope,$http,$routeParams) {
	
		$scope.recipe = {};

		 $http.get("/api/recipes/"+$routeParams.id).
		    success(function(data, status, headers, config) {
		      console.log(data);
		      $scope.recipe = data;
		    });

	});

