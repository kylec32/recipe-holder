var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipe = require('../models/Recipe.js');

router.post('/', function(req, res, next) {

	var recipeSearch =  Recipe.find().where('deleted').equals(false);

	if(req.body.category && req.body.category.length>0){
		recipeSearch = recipeSearch.where('category').equals(new RegExp(req.body.category,"i"));
	}
	if(req.body.ingredient && req.body.ingredient.length >0){
		recipeSearch = recipeSearch.where('ingredients.name').equals(new RegExp(req.body.ingredient,"i"));
	}

  recipeSearch.exec(function (err, recipes) {
    if (err) return next(err);
    
    res.json(recipes);
  });
});

module.exports = router;