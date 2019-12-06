import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { MonografiaService } from './../../monografias/modules/monografia.service';

@Component({
  selector: 'app-loading-upload',
  templateUrl: './loading-upload.component.html',
  styleUrls: ['./loading-upload.component.css']
})
export class LoadingUploadComponent implements OnInit {

  statusCounter = 10;
  constructor(private monografiaSerice: MonografiaService) {
  }

  ngOnInit() {
    this.monografiaSerice.emitStatusUploader
      .subscribe((event) => {
        if (event === HttpEventType.UploadProgress) {
          console.log(event);
          this.statusCounter = (Math.round(event.loaded / event.total * 100));
        }

        console.log(this.statusCounter);

      });
  }

}
