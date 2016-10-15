(function(){
	angular.module('recipe-holder').factory('categoryService', function($http,$location){

        var category = {};

        category.getCategories = function(isDefaultValueExcluded) {
            var cat = isDefaultValueExcluded ? [] : ["No Filter"];

            $http.get("/api/categories").
                success(function(data, status, headers, config) {
                  data.forEach(function(data) {
                    cat.push(data);
                  });
                });

            return cat;
        }

        return category;

	});
})();
