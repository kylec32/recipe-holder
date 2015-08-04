(function(){
	angular.module('recipe-holder').controller('viewRecipesController', function($scope,$http,$location,$log,$modal, page, recipeService) {

		$scope.delOption = {};

		$scope.recipes = [];
		$scope.categories = ["No Filter"];

		page.setTitle("List of Recipes");

		$scope.recipes = recipeService.getRecipes();
		
		$http.get("/api/categories").
			success(function(data,status,headers,config) {
				data.forEach(function(data) {
					$scope.categories.push(data);
				});
			});

		$scope.filterCategory = function(category) {
			$scope.recipes = [];
			if(category == "No Filter") {
				 $http.get("/api/recipes").
				    success(function(data, status, headers, config) {
				      data.forEach(function(data) {
				        $scope.recipes.push(data);
				      });
				 });
			}
			else {
				var searchCriteria = {};
				searchCriteria.category = category;
				$http.post("/api/search",searchCriteria).
					success(function(data,status,headers,config) {
						data.forEach(function(data) {
				        	$scope.recipes.push(data);
				      	});
					});
			}
		};

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
					$location.url("/view/");
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
})();
