import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthtokenService {
  constructor() {}

  gettoken() {
    return localStorage.getItem('x-access-token');
  }

  removetoken() {
  return  localStorage.removeItem('x-access-token');
  }
}
