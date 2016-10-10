(function(){
	angular.module('recipe-holder').factory('categoryService', function($http,$location){
     
        var category = {};

        category.getCategories = function() {
            var cat = ["No Filter"];

            $http.get("/api/categories").
                success(function(data, status, headers, config) {
                    
                  data.forEach(function(data) {
                    // cat.push(data);
                    var sp = data.split(',');
                    sp.forEach(function(d){
                        console.log(d);
                        if(cat.indexOf(d) == -1)
                            cat.push(d);
                    });
                  });
                });

            return cat;
        }

        return category;
 
	});
})();