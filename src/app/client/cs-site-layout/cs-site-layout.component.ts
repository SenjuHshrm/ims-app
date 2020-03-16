import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { Config } from '../../default/config.enum';

@Component({
  selector: 'app-cs-site-layout',
  templateUrl: './cs-site-layout.component.html',
  styleUrls: ['./cs-site-layout.component.scss']
})
export class CsSiteLayoutComponent implements OnInit {

  public pageID: string = Config.PAGE_ID

  constructor(
    private facebookService: FacebookService
  ) { }

  ngOnInit() {
    this.initFacebookService()
  }

  private initFacebookService() {
    const initParams: InitParams = {
      xfbml: true,
      version: 'v3.2'
    }
    this.facebookService.init(initParams)
  }

}
