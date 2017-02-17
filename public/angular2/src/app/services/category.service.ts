import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Recipe } from '../Recipe'

@Injectable()
export class CategoryService {

  getUrl:string = "http://localhost:3000/api/categories"

  constructor(private _http:Http) { }
  
  getCategories():Observable<string[]>
  {
    return this._http
                .get(this.getUrl)
                .map(response => response.json() as string[])
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
