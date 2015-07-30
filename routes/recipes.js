var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipe = require('../models/Recipe.js');

/* GET /recipes listing. */
router.get('/', function(req, res, next) {
  Recipe.find('title, url, prep_time, cook_time, instructions, ingredients',function (err, recipes) {
    if (err) return next(err);
    var currentRecipes = [];
    for(var i=0; i<recipes.length; i++){
      if(!recipes[i].deleted){
        currentRecipes.push(recipes[i]);
      }
    }
    res.json(currentRecipes);
  });
});

router.post('/', function(req, res, next) {
  Recipe.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', function(req, res, next) {
  Recipe.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  Recipe.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  req.body.deleted = "true";
  Recipe.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;