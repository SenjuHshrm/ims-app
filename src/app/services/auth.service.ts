import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isUserAuthenticated(): boolean {
    return (localStorage.getItem('gpAdmin')) ? true : false;
  }

}
