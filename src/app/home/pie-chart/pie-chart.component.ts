import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { HomeService } from '../modules/home.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  // Pie Chart
  public pieChartLabels;
  public pieChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public pieChartType = 'pie';

  constructor(private homeSerice: HomeService) { }

  ngOnInit() {
    this.pieChartLabels = [
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

    const barChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: [
          'Janeiro', 'Fevereiro',
          'Março', 'Abril',
          'Maio', 'Junho',
          'Julho', 'Agosto',
          'Setembro', 'Outubro',
          'Novembro', 'Dezembro'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            steppedLine: true,
            borderCapStyle: 'round',
            borderWidth: 2
          }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.homeSerice.onDataChanged.subscribe(
      (data) => this.loadDateFrom(data)
    );

    this.loadDateFrom(0);
  }

  loadDateFrom(v: number) {
    switch (v) {
      case 2016:
        this.pieChartData = [
          10, 110, 180, 90,
          30, 120, 50, 150,
          129, 20, 178, 50];
        break;
      case 2017:
        this.pieChartData = [
          120, 150, 180, 30,
          35, 320, 120, 10,
          169, 290, 150, 5];
        break;
      case 2018:
        this.pieChartData = [
          45, 150, 180, 190,
          35, 20, 100, 10,
          100, 90, 278, 57];
        break;
      case 2019:
        this.pieChartData = [
          120, 150, 180, 105,
          135, 30, 100, 10,
          109, 260, 118, 5];
        break;
      default:
        this.pieChartData = [
          120, 150, 180, 125,
          35, 320, 100, 10,
          169, 290, 78, 5];
    }
  }

}
