var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipe = require('../models/Recipe.js');

/* GET /recipes listing. /^bar$/i*/
router.post('/', function(req, res, next) {
 console.log("/^"+req.body.category+"$/i");
  Recipe.find().where('category').equals(new RegExp(req.body.category,"i")).where('deleted').equals(false).exec(function (err, recipes) {
    if (err) return next(err);
    
    res.json(recipes);
  });
});

module.exports = router;