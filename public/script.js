	// create the module and name it scotchApp
	var app = angular.module('recipe-holder', ['ui.bootstrap', 'ngRoute']);

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
			.when('/add/:id', {
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
		
	});

	app.controller('addController', function($scope, $http, $location,$routeParams,$modal) {
		
		$scope.recipe = {ingredients:[]};
		$scope.title = "Add Recipe";


		if($routeParams.id){

			$http.get("/api/recipes/"+$routeParams.id).
				success(function(data,status,headers,config) {
					console.log(data);
					$scope.recipe = data;
					$scope.title = "Edit: "+$scope.recipe.title;
				});
		}

		$scope.importIngs = function(){
			var modalInstance = $modal.open({
			    animation: true,
			    templateUrl: 'ingredientImport.html',
			    controller: 'IngredientImportCtrl',
			    backdrop: "static"
			  });

			modalInstance.result.then(function (ingredients) {
				console.log(ingredients);
		    	$scope.recipe.ingredients = ingredients;
		  	});
		}

		$scope.deleteIngredient = function(ingredient){
			var modalInstance = $modal.open({
			    animation: true,
			    templateUrl: 'myModalContent.html',
			    controller: 'ModalInstanceCtrl',
			    backdrop: "static"
			  });

			$scope.delIngredient = ingredient;

		    modalInstance.result.then(function (ingredient) {
		    	var indexofdeletion = $scope.recipe.ingredients.indexOf($scope.delIngredient);
				$scope.recipe.ingredients.splice(indexofdeletion,1);
		  	});
		}
		
		$scope.addIngredient = function(){
			$scope.recipe.ingredients.push({name:"",quantity:"",units:""});
		};

		$scope.saveRecipe = function(){
			if($scope.recipe._id){
				$http.put("/api/recipes/"+$scope.recipe._id, $scope.recipe).
			    success(function(data, status, headers, config) {
			      $location.url("/view/"+data._id);
			    });
			}
			else{
				$http.post("/api/recipes", $scope.recipe).
			    success(function(data, status, headers, config) {
			      $location.url("/view/"+data._id);
			    });
			}
			
		};
	});


	app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating" ng-class="{readonly: readonly}">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {	
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&',
            readonly:'='
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue.rating
                    });
                }
            };

            scope.toggle = function (index) {
            	if (scope.readonly == undefined || scope.readonly == false){
	                scope.ratingValue.rating = index + 1;
	                updateStars();
	                scope.onRatingSelected({
	                    rating: index + 1
	                });
            	}
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});


	app.controller('viewRecipesController', function($scope,$http,$location,$log,$modal) {

		$scope.delOption = {};

		$scope.recipes = [];
	
		 $http.get("/api/recipes").
		    success(function(data, status, headers, config) {
		      data.forEach(function(data) {
		        $scope.recipes.push(data);
		      })
		    });

		$scope.go = function(recipe) {

			$location.url("/view/"+recipe._id);
		};

		$scope.deleteRecipe = function(recipe) {
			$scope.delOption = recipe;

			var modalInstance = $modal.open({
			    animation: true,
			    templateUrl: 'myModalContent.html',
			    controller: 'ModalInstanceCtrl',
			    backdrop: "static"
			  });
		    modalInstance.result.then(function (recipe) {
				$http.delete("/api/recipes/"+$scope.delOption._id).
					success(function(data,status,headers,config){
					$location.url("/view/")
				});
		  	});
		};


		$scope.open = function (size) {

		    var modalInstance = $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'myModalContent.html',
		      controller: 'ModalInstanceCtrl',
		      size: size,
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		  };
	});

	app.controller('viewRecipeController', function($scope,$http,$location,$routeParams) {
	
		$scope.recipe = {};

		 $http.get("/api/recipes/"+$routeParams.id).
		    success(function(data, status, headers, config) {
		      console.log(data);
		      $scope.recipe = data;
		    });

		$scope.editRecipe = function(editRecipe){
			console.log(editRecipe);
			$location.url("/add/"+editRecipe._id);
		};

	});

	app.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

	  $scope.delete = function() {
	  	$modalInstance.close($scope.delOption);
	  }

	  $scope.close = function () {
	    $modalInstance.dismiss('cancel');
	  };

});

	function ingredientsArray(blob){
		var ingredientLists = [];
		var lines = blob.split("\n");

		for(var i=0; i<lines.length; i++){
			var currentIngredient = lines[i];
			var element = {};
			element.quantity = lines[i].match(/\S+/)[0];
			element.units = lines[i].match(/teaspoons|teaspoon|tablespoons|tablespoon|tsps|tsp|Tsps|Tsp|cups|cup|pounds|pound|ibs|ib/) == null ? "" : lines[i].match(/teaspoons|teaspoon|tablespoons|tablespoon|tsps|tsp|Tsps|Tsp|cups|cup|pounds|pound|ibs|ib/)[0];
			element.name = currentIngredient.replace(element.units,'').replace(element.quantity,'').trim();
			ingredientLists.push(element);
		}
		return ingredientLists;
	}

	app.controller('IngredientImportCtrl', function ($scope, $modalInstance) {

	$scope.importIngredients = {data:""};

	  $scope.import = function() {
	  	var response = ingredientsArray($scope.importIngredients.data);
	  	$modalInstance.close(response);
	  }

	  $scope.close = function () {
	    $modalInstance.dismiss('cancel');
	  };

	});

