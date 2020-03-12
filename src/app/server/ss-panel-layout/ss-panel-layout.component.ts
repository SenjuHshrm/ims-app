import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-ss-panel-layout',
  templateUrl: './ss-panel-layout.component.html',
  styleUrls: ['./ss-panel-layout.component.scss']
})
export class SsPanelLayoutComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    if(!localStorage.getItem('gpAdmin')) {
      this.router.navigate(['/admin-login'])
    } else {
      let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
      if(this.route.snapshot.params['username'] != token.username) {
        this.router.navigate(['/logout'])
      }
    }
  }

  ngOnInit() {

  }

}
