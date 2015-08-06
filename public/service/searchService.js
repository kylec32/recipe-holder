(function(){
	angular.module('recipe-holder').factory('searchService', function($http,$location){
     
        var search = {};

        search.search = function(searchCriteria) {
            var searchResults = [];

            $http.post("/api/search",searchCriteria).
                    success(function(data,status,headers,config) {
                        data.forEach(function(data) {
                            searchResults.push(data);
                        });
                    });

            return searchResults;
        }

        return search;
 
	});
})();