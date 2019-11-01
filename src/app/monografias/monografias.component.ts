import { Component, OnInit } from '@angular/core';
import { MonografiaService } from './modules/monografia.service';

@Component({
  selector: 'app-monografias',
  templateUrl: './monografias.component.html',
  styleUrls: ['./monografias.component.css']
})
export class MonografiasComponent implements OnInit {

  view = 0;
  constructor(private monografiaService: MonografiaService) {

    this.monografiaService.onChangeContextTitle.emit('Monografia Internas');
  }

  ngOnInit() {
  }

  onBtnClickedToChange() {
    this.view++;
    if (this.view > 2) {
      this.view = 0;
    }
  }

}
