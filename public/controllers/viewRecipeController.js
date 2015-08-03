(function(){
	angular.module('recipe-holder').controller('viewRecipeController', function($scope,$http,$location,$routeParams) {
		
		$scope.recipe = {};

		 $http.get("/api/recipes/"+$routeParams.id).
		    success(function(data, status, headers, config) {
		      $scope.recipe = data;
		      $scope.recipe.instructions = nl2br($scope.recipe.instructions);
		    });

		$scope.editRecipe = function(editRecipe){
			$location.url("/add/"+editRecipe._id);
		};

	});

	function nl2br(content){
		var convertedContent = '';
		for(var i=0; i<content.length; i++){
			if(content.charCodeAt(i) == 10){
				convertedContent += "<br/>";
			}
			else{
				convertedContent += content[i];
			}
		}

		return convertedContent;
	}
})();