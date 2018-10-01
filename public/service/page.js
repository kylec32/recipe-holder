(function() {
	angular.module('recipe-holder').factory('page', function() {
	   var title = 'default';
	   return {
	     title: function() { return title; },
	     setTitle: function(newTitle) { console.log(newTitle); title = newTitle; }
	   };
	});
})();