import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../default/config.enum';

@Injectable({
  providedIn: 'root'
})
export class UpdateAcctService {

  constructor(private http: HttpClient) { }

  update(data: any): Observable<any> {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('gpAdmin')
      })
    }
    return this.http.post(Config.api + '/api/update', data, headers)
  }

  closeNotif(data: any) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('gpAdmin')
      })
    }
    return this.http.post(Config.api + '/api/close-notif', data, headers)
  }

  getNotifs(data: any) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('gpAdmin')
      })
    }
    return this.http.get(Config.api + '/api/get-notifs/' + data.username, headers)
  }

  deleteNotif(data: any) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('gpAdmin')
      })
    }
    return this.http.post(Config.api + '/api/delete-notifs', data, headers)
  }

}
