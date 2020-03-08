import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UsersLs } from '../../interfaces/users-ls';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import * as _ from 'lodash';

var users: UsersLs[] = []

@Component({
  selector: 'app-acct-list',
  templateUrl: './acct-list.component.html',
  styleUrls: ['./acct-list.component.scss']
})
export class AcctListComponent implements OnInit {

  public usersLs: any = []
  public usersTbl = new MatTableDataSource(users)
  public usersTblHdr: string[] = ['username', 'fname', 'mname', 'lname', 'type', 'activated']
  public keyword: string = '';

  constructor(
    private user: LoginService,
    private sBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.populateTable()
  }

  populateTable() {
    users = []
    this.usersLs = []
    this.user.getUserLs().subscribe(res => {
      this.usersLs = res;
      if(this.keyword == '') {
        _.forEach(this.usersLs, (arr: any) => {
          users.push({
            username: arr.username,
            fName: arr.fName,
            mName: arr.mName,
            lName: arr.lName,
            type: arr.type,
            activated: arr.activated
          })
        })
        this.usersTbl = new MatTableDataSource(users)
      } else {
        this.searchUsername(this.keyword)
      }
    })
  }

  activatorToggle(row: any, evt: MouseEvent) {
    evt.defaultPrevented
    let obj = _.find(this.usersLs, { username: row.username })
    let data = {
      id: obj._id,
      activated: row.activated
    }
    console.log(data)
    this.user.activationToggle(data).subscribe(res => {
      if(res) {
        this.usersLs = []
        this.user.getUserLs().subscribe(res => {
          this.usersLs = res
        })
      }
    })
  }

  searchUsername(kwrd: string) {
    let res = this.usersLs.filter(resp => {
      return resp.username.startsWith(kwrd)
    })
    users = []
    _.forEach(res, arr => {
      users.push({
        username: arr.username,
        fName: arr.fName,
        mName: arr.mName,
        lName: arr.lName,
        type: arr.type,
        activated: arr.activated
      })
    })
    this.usersTbl = new MatTableDataSource(users)
  }

}
