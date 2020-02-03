import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../default/config.enum';

@Injectable({
  providedIn: 'root'
})
export class DefValService {

  constructor(private http: HttpClient) { }

  getVal(): Observable<any> {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('gpAdmin')
      })
    }
    return this.http.get(Config.api + '/api/get-def', headers)
  }

}
