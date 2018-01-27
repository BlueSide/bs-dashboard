import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GlobalFiltersComponent } from './global-filters/global-filters.component';
import { NavComponent } from './nav/nav.component';
import { WsStatusComponent } from './websocket-status/websocket-status.component';
import { TableComponent } from './table/table.component';
import { Chart1Component } from './chart/chart1.component';
import { Chart2Component } from './chart/chart2.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { ValueComponent } from './value/value.component';
import { FunnelComponent } from './funnel/funnel.component';
import { DevAlertComponent } from './dev-alert/dev-alert.component';
import { TestComponentComponent } from './test-component/test-component.component';

@NgModule({
  declarations: [
      AppComponent,
      NavComponent,
      GlobalFiltersComponent,
      WsStatusComponent,
      TableComponent,
      Chart1Component,
      Chart2Component,
      PokemonComponent,
      ValueComponent,
      FunnelComponent,
      DevAlertComponent,
      TestComponentComponent
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
