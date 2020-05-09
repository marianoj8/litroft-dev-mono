import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InscricaoService } from '../modules/inscricao.service';

@Component({
  selector: 'app-inscricao-options',
  templateUrl: './inscricao-options.component.html',
  styleUrls: ['./inscricao-options.component.css']
})
export class InscricaoOptionsComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private inscricaoService: InscricaoService
  ) { }

  ngOnInit() {
    this.inscricaoService.onChangeContext.emit(false);
    this.inscricaoService.emitSubOption.subscribe(onValue => this.showOptionPage());
  }

  private showOptionPage(): void {
    this.router.navigate(['subscription-option'], { relativeTo: this.activatedRoute });
  }

}
