import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  //Bar Chart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2019'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [50], label: 'Janeiro' },
    { data: [74], label: 'Fevereiro' },
    { data: [15], label: 'Março' },
    { data: [80], label: 'Abril' },
    { data: [77], label: 'Maio' },
    { data: [19], label: 'Junho' },
    { data: [46], label: 'Julho' },
    { data: [50], label: 'Agosto' },
    { data: [59], label: 'Setembro' },
    { data: [92], label: 'Outubro' },
    { data: [20], label: 'Novembro' },
    { data: [43], label: 'Dezembro' }
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
  public radarChartLegend = true;
  public radarChartLabels = [];
  public radarChartType = 'radar';

  constructor() {

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
}

