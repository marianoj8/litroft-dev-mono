import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from '../shared/services/security/auth.service';
import { UsernameAndPassword } from '../shared/model/support/username-password';
import { Token } from '../shared/model/support/token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: UsernameAndPassword;
  public token$: Observable<Token>;

  constructor() { }

  ngOnInit(): void {

  }

}
