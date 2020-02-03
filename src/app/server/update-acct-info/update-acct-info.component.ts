import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as jwtDecode from 'jwt-decode';

import { UpdateAcctService } from '../../services/update-acct.service'

@Component({
  selector: 'app-update-acct-info',
  templateUrl: './update-acct-info.component.html',
  styleUrls: ['./update-acct-info.component.scss']
})
export class UpdateAcctInfoComponent implements OnInit {

  public acctInfo: any

  constructor(
    private updAcct: UpdateAcctService,
    private sBar: MatSnackBar) { }

  ngOnInit() {
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
    console.log(token)
    this.acctInfo = {
      username: token.username,
      password: '',
      cpass: '',
      fName: token.fName,
      mName: token.mName,
      lName: token.lName,
      addr: token.addr,
      contact: token.contact

    }
  }

  updateAcct(form: any, evt: MouseEvent) {
    evt.defaultPrevented
    if(form.password == form.cpass) {
      Object.keys(form).forEach(key => {
        if(key != 'username' && key != 'password' && key != 'cpass') {
          form[key] = form[key].toUpperCase()
        }
      })
      this.updAcct.update(form).subscribe(res => {
        switch(res.res) {
          case 'ER':
            this.sBar.open('An error occured (code 500)', 'OK', { duration: 2000 })
            break;
          case 'N':
            this.sBar.open('Account not registered', 'OK', { duration: 2000 })
            break;
          default:
            let token: any = jwtDecode(res.res)
            localStorage.setItem('gpAdmin', res.res)
            window.location.href = '/user/' + token.username + '/acct-setting';
        }
      })
    } else {
      this.sBar.open('Passwords didn\'t match', 'OK', { duration: 2000 })
    }
  }

  resetForm() {
    this.ngOnInit()
  }

}
