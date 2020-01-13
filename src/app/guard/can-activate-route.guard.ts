import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements  CanActivate {

  constructor(private auth: AuthService) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.auth.isUserAuthenticated()) {
      window.location.href = '/admin-login';
      return false;
    } else {
      return true;
    }
  }

}
