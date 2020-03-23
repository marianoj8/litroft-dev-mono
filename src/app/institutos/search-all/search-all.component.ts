import { Instituto } from './../../shared/model/instituto';
import { Observable } from 'rxjs';
import { InstitutoService } from './../modules/instituto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {

  institutos$: Observable<Instituto[]>;
  constructor(private institutoService: InstitutoService) { }

  ngOnInit(): void {
    this.institutoService.emitShowSearchBar.emit(true);
    this.institutos$ = this.institutoService.list();
  }

}
