import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ss-home',
  templateUrl: './ss-home.component.html',
  styleUrls: ['./ss-home.component.scss']
})
export class SsHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(!localStorage.getItem('gpAdmin')) {
      window.location.href = '/admin-login'
    }
  }

}
