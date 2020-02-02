import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicService } from '../../modules/public.service';
import { on } from 'cluster';
import { Subscription, Observable } from 'rxjs';
import { MonografiaService } from '../../../monografias/modules/monografia.service';
import { Monografia } from '../../../shared/model/monografia';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  monografia: Monografia;
  constructor(
    private publicService: PublicService,
    private monografiaService: MonografiaService,
    private route: ActivatedRoute) {

  }

  step = 0;
  ngOnInit(): void {
    this.monografiaService.getOneById(this.route.snapshot.url[1].path)
      .subscribe(onValue => this.monografia = onValue);
    this.subscription = this.publicService.emitMonoDetalhe.subscribe(d => this.onActiveStyle());
  }

  public onActiveStyle(): void {
    const div = window.document.querySelector('div#mainContainer');
    div.classList.toggle('container-active');
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

