import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstitutoService } from './modules/instituto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instituto',
  templateUrl: './instituto.component.html',
  styleUrls: ['./instituto.component.css']
})
export class InstitutoComponent implements OnInit, OnDestroy {

  public onChangeContext = false;
  private sub: Subscription;
  constructor(
    private institutoService: InstitutoService,
    private location: Location) { }

  ngOnInit() {
    this.sub = this.institutoService.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );
  }

  cleanSearchField() { }
  onFilterSearch() { }
  find($event, param: string) { }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
