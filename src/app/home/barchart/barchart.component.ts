import { Component, OnInit } from '@angular/core';
import { HomeService } from '../modules/home.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  // Bar Chart
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

  constructor(private homeSerice: HomeService) { }

  ngOnInit() {
    this.homeSerice.onDataChanged.subscribe(
      (data) => this.loadDateFrom(data)
    );

    this.loadDateFrom(0);
  }

  loadDateFrom(v: number) {
    switch (v) {
      case 2016:
        this.barChartData = [
          { data: [90], label: 'Janeiro' },
          { data: [54], label: 'Fevereiro' },
          { data: [110], label: 'Março' },
          { data: [80], label: 'Abril' },
          { data: [27], label: 'Maio' },
          { data: [69], label: 'Junho' },
          { data: [46], label: 'Julho' },
          { data: [59], label: 'Agosto' },
          { data: [79], label: 'Setembro' },
          { data: [32], label: 'Outubro' },
          { data: [20], label: 'Novembro' },
          { data: [95], label: 'Dezembro' }
        ];
        this.barChartLabels = ['2016'];
        break;
      case 2017:
        this.barChartData = [
          { data: [95], label: 'Janeiro' },
          { data: [20], label: 'Fevereiro' },
          { data: [32], label: 'Março' },
          { data: [79], label: 'Abril' },
          { data: [59], label: 'Maio' },
          { data: [46], label: 'Junho' },
          { data: [69], label: 'Julho' },
          { data: [27], label: 'Agosto' },
          { data: [80], label: 'Setembro' },
          { data: [110], label: 'Outubro' },
          { data: [54], label: 'Novembro' },
          { data: [90], label: 'Dezembro' }
        ];
        this.barChartLabels = ['2017'];
        break;
      case 2018:
        this.barChartData = [
          { data: [90], label: 'Janeiro' },
          { data: [54], label: 'Fevereiro' },
          { data: [110], label: 'Março' },
          { data: [80], label: 'Abril' },
          { data: [27], label: 'Maio' },
          { data: [69], label: 'Junho' },
          { data: [46], label: 'Julho' },
          { data: [59], label: 'Agosto' },
          { data: [79], label: 'Setembro' },
          { data: [32], label: 'Outubro' },
          { data: [20], label: 'Novembro' },
          { data: [95], label: 'Dezembro' }
        ];
        this.barChartLabels = ['2018'];
        break;
      case 2019:
        this.barChartData = [
          { data: [19], label: 'Janeiro' },
          { data: [154], label: 'Fevereiro' },
          { data: [110], label: 'Março' },
          { data: [180], label: 'Abril' },
          { data: [270], label: 'Maio' },
          { data: [169], label: 'Junho' },
          { data: [460], label: 'Julho' },
          { data: [159], label: 'Agosto' },
          { data: [790], label: 'Setembro' },
          { data: [232], label: 'Outubro' },
          { data: [200], label: 'Novembro' },
          { data: [295], label: 'Dezembro' }
        ];
        this.barChartLabels = ['2019'];
        break;
      default:
        this.barChartData = [
          { data: [19], label: 'Janeiro' },
          { data: [154], label: 'Fevereiro' },
          { data: [110], label: 'Março' },
          { data: [180], label: 'Abril' },
          { data: [270], label: 'Maio' },
          { data: [169], label: 'Junho' },
          { data: [460], label: 'Julho' },
          { data: [159], label: 'Agosto' },
          { data: [790], label: 'Setembro' },
          { data: [232], label: 'Outubro' },
          { data: [200], label: 'Novembro' },
          { data: [295], label: 'Dezembro' }
        ];
        this.barChartLabels = ['2019'];

    }
  }
}
