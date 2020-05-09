import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forbidden-error-dialog',
  templateUrl: './forbidden-error-dialog.component.html',
  styleUrls: ['./forbidden-error-dialog.component.css']
})
export class ForbiddenErrorDialogComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }
}
