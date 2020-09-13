import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

import { BarchartComponent } from '../barchart/barchart.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from '../home.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { HomeRoutingModlue } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    BarchartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModlue,
    // ChartsModule,
  ]
})
export class HomeModule { }
