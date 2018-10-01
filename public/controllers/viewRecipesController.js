(function(){
	angular.module('recipe-holder').controller('viewRecipesController', function($scope, $http, $location, $log, $modal, page, recipeService, categoryService, searchService, _) {

		$scope.delOption = {};
		$scope.searchTerm = '';

		$scope.recipes = [];
		$scope.categories = ['No Filter'];

		$scope.recipes = recipeService.getRecipes();
		
		$scope.categories = categoryService.getCategories();
		$scope.currentCategory = 'No Filter'

		$scope.filterCategory = function(category) {
			$scope.recipes = [];
			$scope.currentCategory = category;
			if (category == 'No Filter') {
				 $scope.recipes = recipeService.getRecipes();
			}
			else {
				var searchCriteria = {};
				searchCriteria.category = category;
				$scope.recipes = searchService.search(searchCriteria);
			}
		};

		$scope.go = function(recipe) {

			$location.url('/view/' + recipe._id);
		};

		$scope.deleteRecipe = function(recipe) {
			$scope.delOption = recipe;

			var modalInstance = $modal.open({
			    animation: true,
			    templateUrl: 'myModalContent.html',
			    controller: 'ModalInstanceCtrl',
			    backdrop: 'static'
			  });

		    modalInstance.result.then(function(recipe) {
		    	recipeService.deleteRecipe($scope.delOption._id)
		    		.success(function(data, status, headers, config) {
		    			$location.url('/view/');
		    		});
		  	});
		};

		$scope.search = _.debounce(doSearch, 500);

		function doSearch() {
			var searchCriteria = {};
			searchCriteria.ingredients = $scope.searchTerm.split(',');
			$scope.recipes = searchService.search(searchCriteria);
		}

		$scope.open = function(size) {

		    var modalInstance = $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'myModalContent.html',
		      controller: 'ModalInstanceCtrl',
		      size: size,
		      resolve: {
		        items: function() {
		          return $scope.items;
		        }
		      }
		    });

		    modalInstance.result.then(function(selectedItem) {
		      $scope.selected = selectedItem;
		    }, function() {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		  };
	});
})();
