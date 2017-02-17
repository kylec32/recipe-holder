/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecipeServiceService } from './recipe-service.service';

describe('RecipeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeServiceService]
    });
  });

  it('should ...', inject([RecipeServiceService], (service: RecipeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
