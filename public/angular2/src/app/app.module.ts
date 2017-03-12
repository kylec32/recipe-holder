import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { RecipeService } from './services/recipe-service.service'
import { CategoryService } from './services/category.service'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ActivityPickerComponent } from './activity-picker/activity-picker.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: ActivityPickerComponent },
  { path: 'add', component: AddComponent},
  { path: 'add/:id', component: AddComponent},
  { path: 'view', component: ViewComponent},
  { path: 'view/:id', component: ViewRecipeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StarRatingComponent,
    HomeComponent,
    ActivityPickerComponent,
    AddComponent,
    ViewComponent,
    ConfirmComponent,
    ViewRecipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BootstrapModalModule
  ],
  entryComponents: [
    ConfirmComponent
  ],
  providers: [RecipeService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
