import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { Config } from '../default/config.enum';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;

  constructor() {
    this.socket = io(Config.api);
  }

  public listen (eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data)
      })
    })
  }

  public emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }
}
