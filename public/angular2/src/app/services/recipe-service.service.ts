import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Recipe } from '../Recipe'

@Injectable()
export class RecipeService {

  getUrl:string = "http://localhost:3000/api/recipes"

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

}
