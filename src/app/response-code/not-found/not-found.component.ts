import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  public route: string;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('gpAdmin')) {
      let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
      this.route = '/user/' + token.username
    } else {
      this.route = '/'
    }
  }

}
