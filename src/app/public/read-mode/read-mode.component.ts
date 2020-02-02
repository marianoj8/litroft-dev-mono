import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

import { PublicService } from '../modules/public.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { url } from 'inspector';

@Component({
  selector: 'app-read-mode',
  templateUrl: './read-mode.component.html',
  styleUrls: ['./read-mode.component.css']
})
export class ReadModeComponent implements OnInit {

  state = 0;
  initialzZoon = 80;
  iconState = 'fullscreen';
  pdfSrc = '';
  public onChangeContext = false;
  constructor(
    private http: HttpClient,
    public publicService: PublicService,
    private monografiaService: MonografiaService,
    private activetedRoute: ActivatedRoute,
    private location: Location) {
    this.monografiaService.emitShowAddButton.emit(true);
    publicService.onChangeContext.emit(false);
  }


  ngOnInit() {
    this.publicService.loadFileFromAPI(this.activetedRoute.snapshot.params.id);
    this.publicService.enableReadMode.emit(false);
  }

  public onActiveDetails(): void {
    this.publicService.emitMonoDetalhe.emit(true);
  }

  private loadFile(): void {
    this.http.request('GET', `${environment.API}/mono/download/${this.activetedRoute.snapshot.params.id}`)
      .subscribe(data => {

      });
  }

  onEnableReadMode() {

    document.querySelector('.readingMode').classList.toggle('readingMode-active');
    document.querySelector('.float-btn-icon-2')
      .classList.toggle('float-btn-icon-2-active');
    document.querySelector('.float-btn-icon-3')
      .classList.toggle('float-btn-icon-3-active');

    // document.querySelector('.floating-btn-up').classList.toggle('floating-btn-active');
    document.querySelector('.floating-btn-down')
      .classList.toggle('floating-btn-active');

    document.querySelector('.floating-btn-full')
      .classList.toggle('floating-btn-active');

    if (this.state === 0) {
      this.state++;
      this.iconState = 'fullscreen_exit';
      this.publicService.enableReadMode.emit(true);
    } else {
      this.state--;
      this.iconState = 'fullscreen';
      this.publicService.enableReadMode.emit(false);
    }
  }

  onZooIn() {
    this.initialzZoon = this.initialzZoon + 50;
  }
  onZooOut() {
    this.initialzZoon = this.initialzZoon - 50;
  }

  back() {
    this.publicService.enableReadMode.emit(false);
    this.location.back();
  }

}
