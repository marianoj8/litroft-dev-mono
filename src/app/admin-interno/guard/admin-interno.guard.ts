import { Injectable } from '@angular/core';
import { CanLoad, Route, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminInternoService } from '../modules/adminInterno.service';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AdminInternoGuard {


}
