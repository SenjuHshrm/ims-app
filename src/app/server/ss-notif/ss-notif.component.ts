import { Component, OnInit } from '@angular/core';
import { Notif } from '../../interfaces/notif';
import { UpdateAcctService } from '../../services/update-acct.service';
import { WebsocketService } from '../../services/websocket.service';
import * as jwtDecode from 'jwt-decode';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-ss-notif',
  templateUrl: './ss-notif.component.html',
  styleUrls: ['./ss-notif.component.scss']
})
export class SsNotifComponent implements OnInit {

  public notifLs: Notif[] = []

  constructor(private updtAcct: UpdateAcctService, private ws: WebsocketService) { }

  ngOnInit() {
    this.getNotifs()
    this.ws.listen('Item').subscribe((data) => {
      this.getNotifs()
    })
  }

  getNotifs() {
    this.notifLs = [];
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
    this.updtAcct.getNotifs(token).subscribe(res => {
      console.log(res)
      _.forEach(res, (arr: any) => {
        this.notifLs.push({
          title: arr.title,
          content: arr.content,
          date: moment(arr.dateNotified).format('dddd - MMMM DD, YYYY - hh:mm A')
        })
      })
    })
  }

  deleteNotifs() {
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
    this.updtAcct.deleteNotif(token).subscribe(res => {
      if(res) {
        this.getNotifs()
      }
    })
  }

}
