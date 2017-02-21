import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Recipe } from '../recipe';
import { RecipeService } from '../services/recipe-service.service'
import { CategoryService } from '../services/category.service'
import { ConfirmComponent } from '../confirm/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  recipes:Recipe[] = [];
  categories:string[] = [];

  constructor(private _recipeService: RecipeService,
              private _categoryService: CategoryService,
              private _dialogService:DialogService,
              private _router: Router) { }

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

  private deleteRecipe(recipe:Recipe):void {
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

  confirmDelete(recipe:Recipe):void {
    let disposable = this._dialogService.addDialog(ConfirmComponent, {
                    title:`Delete ${recipe.title}?`, 
                    message:`Are you sure you want to delete ${recipe.title}. This action cannot be undone.`})
                    .subscribe((isConfirmed)=>{
                        if(isConfirmed) {
                            this.deleteRecipe(recipe);
                        }
                    });
  }

}
