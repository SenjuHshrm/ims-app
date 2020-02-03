import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddAcctService } from '../../services/add-acct.service';

@Component({
  selector: 'app-ss-add-acct',
  templateUrl: './ss-add-acct.component.html',
  styleUrls: ['./ss-add-acct.component.scss']
})
export class SsAddAcctComponent implements OnInit {

  public acctInfo: any;

  constructor(
    private addAcct: AddAcctService,
    private sBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.acctInfo = {
      username: '',
      password: '',
      cpass: '',
      fName: '',
      mName: '',
      lName: '',
      addr: '',
      contact: ''
    }
  }

  add(form: any, evt: MouseEvent) {
    if(form.password == form.cpass) {
      this.addAcct.add(form).subscribe(res => {
        this.ngOnInit()
        this.sBar.open('Account successfully added', 'OK', { duration: 2000 })
      })
    } else {
      this.sBar.open('Passwords didn\'t match', 'OK', { duration: 2000 })
    }
  }

  resetForm() {
    this.ngOnInit()
  }

}
