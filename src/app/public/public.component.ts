import { Component, OnInit } from '@angular/core';
import { PublicService } from './modules/public.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { CustomFilter } from '../shared/model/support/custom-filter';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  inPublicPage: boolean;
  onChangeContext: boolean;
  filter: CustomFilter;
  sub: Subscription;


  constructor(private publicService: PublicService) {
    this.publicService.onChangeContextTitle.emit('Monografias Externas');

    this.publicService.onChangeContext.subscribe(
      value => this.onChangeContext = value
    );
  }

  ngOnInit() {

  }

  onFilterSearch(descricao: string) {
    this.filter = new CustomFilter();
    this.filter.descricao = descricao;
    this.publicService.inFilterMonografias.emit(this.filter);
  }

  find($event, nome: string) { }

  cleanSearchField(): void {
    this.onFilterSearch('');
  }

}
