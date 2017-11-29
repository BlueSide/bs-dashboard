import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GlobalFiltersComponent } from './global-filters.component';
import { ChartComponent } from './chart.component';
import { NavComponent } from './nav.component';

@NgModule({
  declarations: [
      AppComponent,
      NavComponent,
      GlobalFiltersComponent,
      ChartComponent
  ],
  imports: [
      FormsModule,
      BrowserModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
