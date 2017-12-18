import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GlobalFiltersComponent } from './global-filters.component';
import { NavComponent } from './nav.component';
import { WsStatusComponent } from './websocket-status.component';

import { TableComponent } from './table.component';
import { Chart1Component } from './charts/chart1.component';
import { Chart2Component } from './charts/chart2.component';

@NgModule({
  declarations: [
      AppComponent,
      NavComponent,
      GlobalFiltersComponent,
      WsStatusComponent,
      TableComponent,
      Chart1Component,
      Chart2Component,
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
