import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../default/config.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isUserAuthenticated(): boolean {
    return (localStorage.getItem('gpAdmin')) ? true : false;
  }

  requestSessionId(): Observable<any> {
    let opt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let data = { sessId: this.idParamRandomizer() }
    return this.http.post(Config.api + '/api/visitor-session', data, opt)
  }

  getVisitors(): Observable<any> {
    let opt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('gpAdmin')
      })
    }
    return this.http.get(Config.api + '/api/get/visitors', opt)
  }

  idParamRandomizer(): string {
    let result = '',
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charLn = chars.length
    for(let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLn))
    }
    return result;
  }

}
