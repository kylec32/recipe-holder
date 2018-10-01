(function(){
	function ingredientsArray(blob) {
		var ingredientLists = [];
		var lines = blob.split('\n');

		for (var i = 0; i < lines.length; i++) {
			var currentIngredient = lines[i];
			var element = {};
			element.quantity = lines[i].match(/\S+/)[0];
			element.units = lines[i].match(/teaspoons|teaspoon|tablespoons|tablespoon|tsps|tsp|Tsps|Tsp|cups|cup|pounds|pound|ibs|ib/) === null ? '' : lines[i].match(/teaspoons|teaspoon|tablespoons|tablespoon|tsps|tsp|Tsps|Tsp|cups|cup|pounds|pound|ibs|ib/)[0];
			element.name = currentIngredient.replace(element.units, '').replace(element.quantity, '').trim();
			ingredientLists.push(element);
		}
		return ingredientLists;
	}

	angular.module('recipe-holder').controller('IngredientImportCtrl', function($scope, $modalInstance) {

		$scope.importIngredients = {data: ''};

		$scope.import = function() {
			var response = ingredientsArray($scope.importIngredients.data);
			$modalInstance.close(response);
		};

		$scope.close = function() {
			$modalInstance.dismiss('cancel');
		};

	});
})();