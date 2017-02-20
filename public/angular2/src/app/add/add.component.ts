import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Recipe } from '../recipe';
import { Ingredient } from '../ingredient'
import { RecipeService } from '../services/recipe-service.service'
import { StarRatingComponent } from '../star-rating/star-rating.component'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  recipe:Recipe = this.blankRecipe();
  title:String;

  constructor(private _recipeService:RecipeService, private _router:Router) { }

  ngOnInit() {
    this.recipe.title = "This is the title 2";
  }

  blankRecipe():Recipe {
    return {
      _id: "",
      title: "blah2",
      url:"http://blah2.com",
      prep_time:"4",
      cook_time:"4",
      instructions:"Here is the instructions",
      rating:2, 
      category:"111",
      ingredients:[{_id: "",
        name: "Milk",
        quantity:"1",
        units:"Tbsp"}]
    }
  }

  addIngredient():void {
    this.recipe.ingredients.push({_id: "",
      name: "",
      quantity:"",
      units:""});
  }

  deleteIngredient(ingredient:Ingredient):void {
    var index = this.recipe.ingredients.indexOf(ingredient);
    this.recipe.ingredients.splice(index, 1);
  }

  ingredientsImport():void {
    console.dir(this.recipe)
  }

  saveRecipe():void {
    console.dir(this.recipe);
    console.log("Starting");
    if(this.recipe._id.length == 0) {
      console.log("New");
      this._recipeService.createRecipe(this.recipe)
                          .subscribe(response => console.log(response),
                              err => {
                                console.log(err);
                            });
    } else {
      console.log("Edit");
      this._recipeService.updateRecipe(this.recipe)
                          .subscribe(response => console.log(response),
                              err => {
                                console.log(err);
                            });
    }
  }

}
