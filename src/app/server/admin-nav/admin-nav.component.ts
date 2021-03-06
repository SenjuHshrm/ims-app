import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material'
import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { WebsocketService } from '../../services/websocket.service';
import { UpdateAcctService } from '../../services/update-acct.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit{
  @ViewChild('drawer') drawer: MatSidenav
  public navLs: any = [
    { path: 'dashboard', name: 'Dashboard', ic: 'dashboard', role: ['superAdmin', 'admin'] },
    { path: 'items', name: 'Items', ic: 'storage', role: ['superAdmin', 'admin', 'encoder'] },
    { path: 'sales', name: 'Manage Sales', ic: 'trending_up', role: ['superAdmin', 'admin', 'encoder'] },
    { path: 'report', name: 'Consolidation', ic: 'poll', role: ['superAdmin', 'admin'] },
    { path: 'acct-setting', name: 'Update Account', ic: 'person_outline', role: ['superAdmin', 'admin', 'encoder'] },
    { path: 'add-acct', name: 'Add Account', ic: 'person_add', role: ['superAdmin'] },
    { path: 'acct-list', name: 'Account List', ic: 'people_outline', role: ['superAdmin'] },
    { path: 'add-photo', name: 'Photos', ic: 'image', role: ['superAdmin', 'admin'] },
    { path: '/logout', name: 'Logout', ic: 'power_settings_new', role: ['superAdmin', 'admin', 'encoder'] }
  ]
  public acctName: string;
  private socket;
  public isOpen: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private wsService: WebsocketService,
    private updtAcct: UpdateAcctService) {
    router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close())
  }

  checkAcctType(arr: Array<string>) {
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'));
    let x = arr.indexOf(token.type)
    return (x != -1) ? true : false
  }

  ngOnInit() {
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
    if(token.mName != '') {
      this.acctName = token.fName + ' ' + token.mName.charAt(0) + '. ' + token.lName
    } else {
      this.acctName = token.fName + ' ' + token.lName
    }
    this.wsService.listen('Item').subscribe((_) => {
      // if(this.router.url == '/user/(^[a-z0-9]+$/i)') {
      //
      // }
      let url = this.router.url.split('/')
      if(url[url.length - 1] != 'notifications') {
        this.isOpen = !this.isOpen;
      }
    })
    this.openNotif()
  }

  getUserAccessLvl() {
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
    return (token.type == 'superAdmin') ? 'Super Admin' : (token.type == 'admin') ? 'Admin' : 'Encoder'
  }

  openNotif() {
    if(!this.isOpen) {
      let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
      this.updtAcct.closeNotif(token).subscribe(res => {
        if(res) {
          this.isOpen = !this.isOpen
        }
      })
    }
  }

}
