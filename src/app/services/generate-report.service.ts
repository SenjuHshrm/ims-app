import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../default/config.enum';

@Injectable({
  providedIn: 'root'
})
export class GenerateReportService {

  constructor(private http: HttpClient) { }

  generate(data: any): Observable<any> {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('gpAdmin')
      })
    }
    return this.http.post(Config.api + '/api/gen-report', data, headers)
  }

}
