import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicService } from '../../modules/public.service';
import { on } from 'cluster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private publicService: PublicService) { }

  step = 0;
  ngOnInit(): void {
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

