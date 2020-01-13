import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit{

  public navLs: any = [
    { path: 'items', name: 'Items' },
    { path: 'report', name: 'Sales report'},
    { path: 'add-acct', name: 'Add Account' },
    { path: 'acct-setting', name: 'Update Account' }
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  loggedIn() {
    return (localStorage.getItem('gpAdmin')) ? true : false;
  }

  logOut() {
    localStorage.clear();
    window.location.href = '/admin-login'
  }

  getUsername() {
    if(localStorage.getItem('gpAdmin')) {
      let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
      return token.username;
    } else {
      return '';
    }
  }

  ngOnInit() {

  }

}
