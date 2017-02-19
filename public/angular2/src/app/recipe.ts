import { Ingredient } from './Ingredient'

export interface Recipe {
  _id: String,
  title: String,
  url:String,
  prep_time:String,
  cook_time:String,
  instructions:String,
  rating:Number, 
  category:String,
  ingredients:Ingredient[]
}


// export interface Recipe {
//   _id: String,
//   title: String,
//   url:String,
//   prep_time:String,
//   cook_time:String,
//   instructions:String,
//   rating:Number, 
//   category:String
// }