import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import {AngularFireMessaging} from '@angular/fire/compat/messaging'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

 currentMessage = new BehaviorSubject(null);
  constructor(private FireMessaging: AngularFireMessaging) {
  this.FireMessaging.messages.subscribe(
  (_messaging:any) => {
  _messaging.onMessage = _messaging.onMessage.bind(_messaging);
  _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
  }
  )
  }
  requestPermission() {
  this.FireMessaging.requestToken.subscribe(
  (token:any) => {
  console.log(token);
  },
  (err:any) => {
  console.error('Unable to get permission to notify.', err);
  }
  );
  }
  receiveMessage() {
  this.FireMessaging.messages.subscribe(
  (payload:any) => {
  console.log("new message received. ", payload);
  this.currentMessage.next(payload);
  })
  }
}
