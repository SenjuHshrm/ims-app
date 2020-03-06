import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import * as jwtDecode from 'jwt-decode';

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
      let roles = route.data.roles as Array<string>;
      let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
      let role = roles.indexOf(token.type)
      if(role == -1) {
        window.location.href = '/user/' + token.username + '/items'
        return false;
      } else {
        return true;
      }
    }
  }

}
