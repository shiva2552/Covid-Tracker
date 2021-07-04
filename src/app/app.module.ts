import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonViewComponent } from './person-view/person-view.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonFormComponent,
    PersonViewComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
