import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material'
import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import { map, filter, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit{
  @ViewChild('drawer') drawer: MatSidenav
  public navLs: any = [
    // { path: 'dashboard', name: 'Dashboard', ic: 'dashboard' },
    { path: 'items', name: 'Items', ic: 'storage' },
    { path: 'sales', name: 'Daily Sales', ic: 'trending_up' },
    { path: 'report', name: 'Sales report', ic: 'poll' },
    { path: 'acct-setting', name: 'Update Account', ic: 'person_outline' }
  ]
  public acctName: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close())
  }

  loggedIn() {
    return (localStorage.getItem('gpAdmin')) ? true : false;
  }

  logOut() {
    localStorage.removeItem('gpAdmin');
    this.router.navigate(['/admin-login'])
  }

  checkAcctType() {
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'));
    return (token.type == 'superAdmin') ? true : false;
  }

  checkAcctType2() {
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'));
    return (token.type == 'superAdmin' || token.type == 'admin') ? true : false;
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
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
    if(token.mName != '') {
      this.acctName = token.fName + ' ' + token.mName.charAt(0) + '. ' + token.lName
    } else {
      this.acctName = token.fName + ' ' + token.lName
    }
  }

  getUserAccessLvl() {
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
    return (token.type == 'superAdmin') ? 'Super Admin' : (token.type == 'admin') ? 'Admin' : 'Encoder'
  }

}
