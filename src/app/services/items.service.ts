import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../default/config.enum';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  constructHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('gpAdmin')
      })
    }
  }

  search(obj: any): Observable<any> {
    return this.http.post(Config.api + '/api/search-item', obj, this.constructHeader())
  }

  searchByName(name: string): Observable<any> {
    return this.http.get(Config.api + '/api/search-item/name/' + encodeURI(name), this.constructHeader())
  }

  addItem(data: any): Observable<any> {
    return this.http.post(Config.api + '/api/add-item', data, this.constructHeader())
  }

  updateFeature(data: any): Observable<any> {
    return this.http.post(Config.api + '/api/set-feature', data, this.constructHeader())
  }

  updateItem(data: any): Observable<any> {
    return this.http.post(Config.api + '/api/update-item', data, this.constructHeader())
  }

  addSold(data: any): Observable<any> {
    return this.http.post(Config.api + '/api/add-sold', data, this.constructHeader())
  }

  addRec(data: any): Observable<any> {
    return this.http.post(Config.api + '/api/add-rec', data, this.constructHeader())
  }

  getAllProd() {
    return this.http.get(Config.api + '/api/all-prod', this.constructHeader())
  }

  getFeatured() {
    return this.http.get(Config.api + '/api/get-feat', this.constructHeader())
  }

}
