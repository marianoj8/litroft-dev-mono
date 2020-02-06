import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicService } from '../../modules/public.service';
import { Subscription, Observable } from 'rxjs';
import { MonografiaService } from '../../../monografias/modules/monografia.service';
import { ElementoService } from '../../../elementos/modules/elementos.service';
import { Monografia } from '../../../shared/model/monografia';
import { Elemento } from 'src/app/shared/model/elemento';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  monografia: Monografia;
  elementos$: Observable<Elemento[]>;
  constructor(
    private publicService: PublicService,
    private elementoService: ElementoService,
    private monografiaService: MonografiaService,
    private route: ActivatedRoute) {

  }

  step = 0;
  ngOnInit(): void {
    this.monografiaService.getOneById(this.route.snapshot.url[1].path)
      .subscribe(onValue => {
        this.monografia = onValue;
        this.fetchElemets(onValue);
      });
    this.subscription = this.publicService.emitMonoDetalhe.subscribe(d => this.onActiveStyle());
  }

  public onActiveStyle(): void {
    const div = window.document.querySelector('div#mainContainer');
    div.classList.toggle('container-active');
  }

  public fetchElemets(monografia: Monografia) {
    const grupo: number = monografia.projeto.grupo.id;
    const position: string = monografia.projeto.grupo.posicao;
    const curso: number = monografia.projeto.grupo.curso.id;
    const instituto: number = monografia.projeto.grupo.adminInterno.instituto.id;
    this.elementos$ = this.elementoService.listByPublicParams(position, curso, grupo, instituto);
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

