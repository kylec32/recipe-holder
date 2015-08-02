var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipe = require('../models/Recipe.js');

/* GET /recipes listing. */
router.get('/', function(req, res, next) {
  Recipe.find().where("deleted").equals(false).distinct('category',function (err, recipes) {
    if (err) return next(err);
    
    res.json(recipes);
  });
});

module.exports = router;