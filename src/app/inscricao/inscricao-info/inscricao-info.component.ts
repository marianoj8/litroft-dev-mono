import { InscricaoService } from './../modules/inscricao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscricao-info',
  templateUrl: './inscricao-info.component.html',
  styleUrls: ['./inscricao-info.component.css']
})
export class InscricaoInfoComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private inscricaoService: InscricaoService
  ) { }

  ngOnInit() {
    this.inscricaoService.emitFormScreen.subscribe(onValue => this.add());
  }

  add() {
    this.router.navigate(['form-studant'], { relativeTo: this.activatedRoute });
  }

}
