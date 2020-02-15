import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../modules/matricula.service';

@Component({
  selector: 'app-matricula-opcao',
  templateUrl: './matricula-opcao.component.html',
  styleUrls: ['./matricula-opcao.component.css']
})
export class MatriculaOpcaoComponent implements OnInit {

  constructor(
    private router: Router,
    private matriculaService: MatriculaService
  ) { }

  ngOnInit() {
  }

  private opnForm(option: number): void {
    if (option === 0) {
      this.router.navigate(['from/primario'], { relativeTo: this.activatedRoute });
    }
    if (option === 1) {
      this.router.navigate(['from/ciculo1'], { relativeTo: this.activatedRoute });
    }
    if (option === 2) {
      this.router.navigate(['from/ciculo2'], { relativeTo: this.activatedRoute });
    }
  }
}
