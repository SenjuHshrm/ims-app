import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Config } from '../default/config.enum'
@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  constructHeader(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('gpAdmin')
      })
    }
  }

  getPhotoLs(): Observable<any> {
    return this.http.get(Config.api + '/api/get-photos', this.constructHeader())
  }

  addPhoto(data: any): Observable<any> {
    return this.http.post(Config.api + '/api/add-photo', data, this.constructHeader())
  }

  deletePhoto(data: any): Observable<any> {
    return this.http.post(Config.api + '/api/delete-photo', data, this.constructHeader())
  }
}
