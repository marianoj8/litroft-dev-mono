import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { Token } from '../shared/model/support/token';
import { UsernameAndPassword } from '../shared/model/support/username-password';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: UsernameAndPassword;
  public token$: Observable<Token>;
  listView: boolean = false;

  // Pie Chart
  public pieChartLabels = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  public pieChartData = [
    120,
    150,
    180,
    90,
    35,
    320,
    100,
    10,
    169,
    290,
    78,
    5,
  ];
  public pieChartType = 'pie';


  //Bar Chart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Janeiro' },
    { data: [98, 488, 40, 19, 86, 27, 90], label: 'Fevereiro' },
    { data: [18, 148, 40, 19, 86, 27, 90], label: 'Março' },
    { data: [58, 438, 40, 19, 86, 27, 90], label: 'Abril' },
    { data: [38, 428, 40, 19, 86, 27, 90], label: 'Junho' },
    { data: [28, 484, 40, 19, 86, 27, 90], label: 'Julho' },
    { data: [68, 48, 40, 19, 86, 27, 90], label: 'Agosto' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Setembro' },
    { data: [78, 48, 40, 19, 86, 27, 90], label: 'Outubro' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Novembro' },
    { data: [79, 48, 40, 19, 86, 27, 90], label: 'Dezembro' }
  ];

  // Doughnut Chart
  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4', 'Sales Q5', 'Sales Q6'];
  public doughnutChartData = [120, 150, 180, 90, 75, 100];
  public doughnutChartType = 'doughnut';

  // Radar Chart

  public radarChartData = [
    {
      data: [
        120, 85, 100, 100, 100, 100,
        180, 100, 100, 100, 100, 100],
      label: '2016'
    },
    {
      data: [
        10, 15, 100, 100, 100, 100,
        180, 100, 90, 100, 100, 50],
      label: '2017'
    },
    {
      data: [
        10, 15, 152, 100, 450, 100,
        180, 100, 190, 100, 100, 50],
      label: '2018'
    },

  ];

  public radarChartLabels = [];
  public radarChartType = 'radar';

  constructor(private router: Router, private location: Location) {

    this.radarChartLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    for (let index1 = 0; index1 < this.radarChartData.length; index1++) {
      for (let index = 0; index < this.radarChartData[0].data.length; index++) {
        const v = this.radarChartData[index1].data[index];
        this.radarChartLabels[index].concat(v);
      }
    }
  }

  ngOnInit() {

  }

  switchBetweenMonoAndDash() {
    this.listView = !this.listView;
  }

  back() {
    this.location.back();
  }


}
