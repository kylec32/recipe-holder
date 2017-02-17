import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../services/recipe-service.service'
import { CategoryService } from '../services/category.service'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  recipes:Recipe[] = [];
  categories:string[] = [];

  constructor(private _recipeService: RecipeService,
              private _categoryService: CategoryService) { }

  ngOnInit() {
    this.loadRecipes();
    this.loadCategories();
  }

  private loadRecipes():void {
    this._recipeService.getRecipes()
                        .subscribe(recipes => this.recipes = recipes,
                        err => {
                          console.log(err);
                        });
  }
  
  private loadCategories():void {
    this._categoryService.getCategories()
                          .subscribe(categories => this.categories = categories,
                          err => {
                            console.log(err);
                          });
  }

  deleteRecipe(recipe:Recipe):void {
    this._recipeService.deleteRecipe(recipe._id)
                        .then(response => {
                          this.loadRecipes();
                          this.loadCategories();
                        })
                        .catch(reasons => {
                          this.loadRecipes();
                          console.log(`Error occurred on delete:${recipe._id}`)
                        });
  }

}
