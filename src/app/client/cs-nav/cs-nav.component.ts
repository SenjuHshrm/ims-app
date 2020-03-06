import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cs-nav',
  templateUrl: './cs-nav.component.html',
  styleUrls: ['./cs-nav.component.scss']
})
export class CsNavComponent implements OnInit {

  constructor(private router: Router) {
    this.router.events.subscribe((res) => {
      if(!(res instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0,0)
    })
  }

  ngOnInit() {
  }

}
