(function(){
	angular.module('recipe-holder').controller('addController', function($scope, $http, $location,$routeParams,$modal,page,recipeService) {

		$scope.recipe = {ingredients:[]};
		$scope.title = "Add Recipe";

		if($routeParams.id){

			recipeService.getRecipe($routeParams.id)
				.success(function(data,status,headers,config) {
					$scope.recipe = data;
					$scope.title = "Edit: " + $scope.recipe.title;
				});
		}

		$scope.importIngs = function(){
			var modalInstance = $modal.open({
			    animation: true,
			    templateUrl: 'ingredientImport.html',
			    controller: 'IngredientImportCtrl',
			    backdrop: "static"
			  });

			console.log(modalInstance);

			modalInstance.result.then(function (ingredients) {
				console.log(ingredients);
		    	$scope.recipe.ingredients = ingredients;
		  	});
		};

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
		};
		
		$scope.addIngredient = function(){
			$scope.recipe.ingredients.push({name:"",quantity:"",units:""});
		};

		$scope.saveRecipe = function(){
			console.log($scope.recipe.recipe_id);

			// make categories as array
			var categs = [];
			if($scope.recipe.category != undefined){
				for(var item in $scope.recipe.category){
					categs.push($scope.recipe.category[item]['text']);
				}
				$scope.recipe.category = categs;
			}

			if($scope.recipe._id){
				recipeService.updateRecipe($scope.recipe);
			}
			else{
				recipeService.saveNew($scope.recipe);
			}
			
		};
	});
})();