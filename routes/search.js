var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipe = require('../models/Recipe.js');

router.post('/', function(req, res, next) {

	var recipeSearch =  Recipe.find().where('deleted').equals(false);

	if(req.body.category && req.body.category.length>0){
		recipeSearch = recipeSearch.where('category').equals(new RegExp(req.body.category,"i"));
	}

	if(req.body.ingredients && req.body.ingredients.length > 0){
		req.body.ingredients.map(function (ingredient) {
			recipeSearch = recipeSearch
				.where('ingredients.name')
				.equals(new RegExp(ingredient.trim(),"i"));
		});
	}

  recipeSearch.exec(function (err, recipes) {
    if (err) return next(err);
    
    res.json(recipes);
  });
});

module.exports = router;
