import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: any;
  public loginProc: boolean = false;

  constructor(
    private sBar: MatSnackBar,
    private authUser: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = {
      username: '',
      password: ''
    }
  }


  openSnackBar(msg: string, act: string) {
    this.sBar.open(msg, act, {
      duration: 2000
    })
  }

  login(obj: any, e: any) {
    e.defaultPrevented
    this.loginProc = true
    if(obj.username != '' || obj.password != '') {
      this.authUser.auth(obj).subscribe(res => {
        this.loginProc = false
        switch(res.res) {
          case 'ER':
            this.openSnackBar('An error occured (code 500)', 'OK')
            break;
          case 'NU':
            this.openSnackBar('Username not registered', 'OK')
            break;
          case 'WP':
            this.openSnackBar('Incorrect password', 'OK')
            break;
          case 'NACT':
          this.openSnackBar('This account is not activated', 'OK')
            break;
          default:
            localStorage.setItem('gpAdmin', res.res)
            let token: any = jwtDecode(res.res)
            let route = '/user/' + token.username;
            this.router.navigate([route])
            //window.location.href = route
        }
      })
    }
  }

}
