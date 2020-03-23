import { AuthService } from './../../shared/services/security/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstitutoService } from '../modules/instituto.service';

@Component({
  selector: 'app-instituto-nivel',
  templateUrl: './instituto-nivel.component.html',
  styleUrls: ['./instituto-nivel.component.css']
})
export class InstitutoNivelComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private institutoService: InstitutoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public listarEscola(option: number): void {
    if (this.authService.loggedIn()) {
      if (option === 0) {
        this.router.navigate(['private/list'], { relativeTo: this.activatedRoute });
      }
      if (option === 1) {
        this.router.navigate(['private/ciclo1/list'], { relativeTo: this.activatedRoute });
      }
      if (option === 2) {
        this.router.navigate(['private/ciclo2/list'], { relativeTo: this.activatedRoute });
      }
    } else {
      if (option === 0) {
        this.router.navigate(['primario/list'], { relativeTo: this.activatedRoute });
      }
      if (option === 1) {
        this.router.navigate(['ciclo1/list'], { relativeTo: this.activatedRoute });
      }
      if (option === 2) {
        this.router.navigate(['ciclo2/list'], { relativeTo: this.activatedRoute });
      }
    }
  }

  public openSearchCOmponent(): void {
    this.router.navigate(['search/all'], {relativeTo: this.activatedRoute})
  }
}
