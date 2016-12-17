import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  recipes:Recipe[] = [
    {
       'title': 'My Awesome Sauce',
        'url':'1800 spank me',
        'prep_time':'11',
        'cook_time':'20',
        'instructions':'String',
        'rating':1, 
        'category':'String'
    },
    {
       'title': 'Cool Beans',
        'url':'String',
        'prep_time':'3',
        'cook_time':'1',
        'instructions':'String',
        'rating':1, 
        'category':'String'
    },
    {
       'title': 'Pumpkin Spice',
        'url':'String',
        'prep_time':'15',
        'cook_time':'2',
        'instructions':'String',
        'rating':1, 
        'category':'String'
    },
    {
       'title': 'Biscuts and Gravy',
        'url':'String',
        'prep_time':'4',
        'cook_time':'2',
        'instructions':'String',
        'rating':1, 
        'category':'String'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
