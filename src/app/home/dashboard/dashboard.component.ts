import { Component } from '@angular/core';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }
}
