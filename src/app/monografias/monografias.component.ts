import { Component, OnInit } from '@angular/core';
import { MonografiaService } from './modules/monografia.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-monografias',
  templateUrl: './monografias.component.html',
  styleUrls: ['./monografias.component.css']
})
export class MonografiasComponent implements OnInit {
  public onChangeContext = false;
  view = 0;
  constructor(private monografiaService: MonografiaService, private location: Location) {
    this.monografiaService.onChangeContextTitle.emit('Monografia Internas');

  }

  ngOnInit() {
    this.monografiaService.emitShowAddButton.subscribe(
      context => this.onChangeContext = context
    );

  }

  back() {
    this.location.back();
  }

  onBtnClickedToChange() {
    this.view++;
    if (this.view > 2) {
      this.view = 0;
    }
  }

}
