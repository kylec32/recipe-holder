(function(){
	angular.module('recipe-holder').factory('recipeService', function($http,$location){
     
    var recipes = {};
     
    recipes.getRecipes = function() {
    	var rec = [];

    	$http.get("/api/recipes").
		    success(function(data, status, headers, config) {
		      data.forEach(function(data) {
		        rec.push(data);
		      });
		    });

		return rec;
    } 

    recipes.saveNew = function(recipe) {
    	$http.post("/api/recipes", recipe).
			    success(function(data, status, headers, config) {
			      $location.url("/view/"+data._id);
			    });
    }

    recipes.updateRecipe = function(recipe) {
    	$http.put("/api/recipes/"+recipe._id, recipe).
			    success(function(data, status, headers, config) {
			      $location.url("/view/"+data._id);
			    });
    }

    recipes.getRecipe = function(id) {
    	console.log("ID: "+id);
    	var promise = $http.get("/api/recipes/"+id).
				success(function(data,status,headers,config) {
					return data;
				});

		return promise;
    }
     
    return recipes;
 
	});
})();