import { Router, Route, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { global } from '@angular/compiler/src/util';
import { settings } from 'cluster';
import { utils } from 'protractor';

@Component({
  selector: 'app-error-loading',
  templateUrl: './error-loading.component.html',
  styleUrls: ['./error-loading.component.css']
})
export class ErrorLoadingComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

  public refresh(): void {

  }

}
