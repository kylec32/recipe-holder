import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe-service.service'
import { Recipe } from '../recipe';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  id:String = "Unknown"
  recipe:Recipe = this._recipeService.blankRecipe();

  constructor(private _recipeService:RecipeService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
       this._recipeService.getRecipe(this.id)
                          .subscribe(recipe => this.recipe = recipe,
                            err => {
                              console.log(err);
                            });
    });
  }

}
