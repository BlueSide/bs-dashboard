import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { GlobalFiltersComponent } from './global-filters.component';

@NgModule({
  declarations: [
      AppComponent,
      GlobalFiltersComponent
  ],
  imports: [
      FormsModule,
      BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
