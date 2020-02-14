import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ss-daily-sales',
  templateUrl: './ss-daily-sales.component.html',
  styleUrls: ['./ss-daily-sales.component.scss']
})
export class SsDailySalesComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

}
