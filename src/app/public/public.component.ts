import { Component, OnInit } from '@angular/core';
import { PublicService } from './modules/public.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  inPublicPage: boolean;
  onChangeContext: boolean;
  sub: Subscription;
  constructor(private publicService: PublicService) {
    this.publicService.onChangeContextTitle.emit('Monografias Externas');

    this.publicService.onChangeContext.subscribe(
      value => this.onChangeContext = value
    );
  }

  ngOnInit() {

  }

}
