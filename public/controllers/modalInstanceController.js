(function(){
	angular.module('recipe-holder').controller('ModalInstanceCtrl', function($scope, $modalInstance) {

		$scope.delete = function() {
			$modalInstance.close($scope.delOption);
		};

		$scope.close = function() {
			$modalInstance.dismiss('cancel');
		};

	});
})();