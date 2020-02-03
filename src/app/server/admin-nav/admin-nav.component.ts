import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
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
    { path: 'items', name: 'Items', ic: 'storage' },
    { path: 'report', name: 'Sales report', ic: 'trending_up' },
    { path: 'acct-setting', name: 'Update Account', ic: 'person_outline' }
  ]
  public acctName: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  loggedIn() {
    return (localStorage.getItem('gpAdmin')) ? true : false;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/admin-login'])
  }

  checkAcctType() {
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'));
    return (token.type == 'superAdmin') ? true : false;
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

}
