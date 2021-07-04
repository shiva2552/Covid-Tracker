import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../person-form/person-form.component';
import { PersonViewComponent } from '../person-view/person-view.component';
import { AppComponent } from '../app.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: "add", component: PersonFormComponent },
  { path: "view/:key", component: PersonViewComponent }
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
