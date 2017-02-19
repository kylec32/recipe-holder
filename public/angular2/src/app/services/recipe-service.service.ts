import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Recipe } from '../Recipe'
import { Ingredient } from '../ingredient'

@Injectable()
export class RecipeService {

  getUrl:string = "/api/recipes"

  constructor(private _http:Http) { }
  
  getRecipes():Observable<Recipe[]>
  {
    return this._http
                .get(this.getUrl)
                .map(response => response.json() as Recipe[])
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteRecipe(id:String):Promise<boolean>
  {
    return this._http
                .delete(`${this.getUrl}/${id}`)
                .toPromise()
                .then(response => true)
                .catch(reason => false)
  }

  createRecipe(recipe:Recipe):Observable<Object> {
    delete recipe._id;
    for(var ingredient of recipe.ingredients){
      delete ingredient._id;
    }
    return this._http
              .post(this.getUrl, recipe)
              .map(response => response.json())
              .catch((error:any) => Observable.throw(error.json().err || 'Server error'));
  }

  updateRecipe(recipe:Recipe):Observable<Object> {
    delete recipe._id;
    for(var ingredient of recipe.ingredients){
      delete ingredient._id;
    }
    return this._http
              .put(`${this.getUrl}/${recipe._id}`, recipe)
              .map(response => response.json())
              .catch((error:any) => Observable.throw(error.json().err || 'Server error'));
  }

}
