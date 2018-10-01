(function() {
    angular.module('recipe-holder').directive('starRating', function() {
        return {
            restrict: 'AE',
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
            link: function(scope, elem, attrs) {

                var updateStars = function() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue.rating
                        });
                    }
                };

                scope.toggle = function(index) {
                	if (scope.readonly === undefined || scope.readonly === false){
    	                scope.ratingValue.rating = index + 1;
    	                updateStars();
    	                scope.onRatingSelected({
    	                    rating: index + 1
    	                });
                	}
                };

                scope.$watch('ratingValue', function(oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
            }
        };
    });
})();