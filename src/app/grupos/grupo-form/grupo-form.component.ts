import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.css']
})
export class GrupoFormComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

}
