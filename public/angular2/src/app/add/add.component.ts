import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
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

  recipe:Recipe = this._recipeService.blankRecipe();
  title:String;
  id:String;

  constructor(private _recipeService:RecipeService,
              private _route: ActivatedRoute,
              private _router:Router) { }

  ngOnInit() {
    this.recipe.title = "This is the title 2";
    this._route.params.subscribe(params => {
      if(params['id']) {
        this.id = params['id']
        this._recipeService.getRecipe(this.id)
                          .subscribe(recipe => this.recipe = recipe,
                            err => {
                              console.log(err);
                            });
      }
    });
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
                          .subscribe(response => this._router.navigate(['view',response._id]),
                              err => {
                                console.log(err);
                            });
    } else {
      console.log("Edit");
      this._recipeService.updateRecipe(this.id, this.recipe)
                          .subscribe(response => this._router.navigate(['view',response._id]),
                              err => {
                                console.log(err);
                            });
    }
  }

}
