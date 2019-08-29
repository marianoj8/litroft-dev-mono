import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

   // Pie Chart
   public pieChartLabels;
   public pieChartData;
   public pieChartType = 'pie';

  constructor() { }

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
    this.pieChartData = [
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
  }

}
