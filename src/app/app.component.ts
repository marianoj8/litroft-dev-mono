import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, share } from 'rxjs/operators';
import { AuthService } from './shared/services/security/auth.service';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Litroft Dev - Mono';
  mostrarMenu: false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver) { }


  logOut(drawer: MatDrawer) {
    drawer.close();
    this.authService.doLogOut();
  }

}
