import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ss-panel-layout',
  templateUrl: './ss-panel-layout.component.html',
  styleUrls: ['./ss-panel-layout.component.scss']
})
export class SsPanelLayoutComponent implements OnInit {

  constructor() {
    if(!localStorage.getItem('gpAdmin')) {
      window.location.href = '/admin-login'
    }
  }

  ngOnInit() {

  }

}
