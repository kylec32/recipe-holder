var mongoose = require('mongoose');

var IngredientSchema = new mongoose.Schema({
	name:String,
	quantity:Number,
	units:String
});

var RecipeSchema = new mongoose.Schema({
  title: String,
  url:String,
  prep_time:String,
  cook_time:String,
  instructions:String,
  ingredients:[IngredientSchema]
});

module.exports = mongoose.model('Recipe', RecipeSchema);