import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ActivityPickerComponent } from './activity-picker/activity-picker.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: ActivityPickerComponent },
  { path: 'add', component: AddComponent},
  { path: 'view', component: ViewComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivityPickerComponent,
    AddComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
