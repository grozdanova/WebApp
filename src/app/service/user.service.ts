import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  STORAGE_AUTH_KEY = 'SPECIAL-AUTHENTICATION-KEY';

  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be79655-7ef7d7bf9d20')); 
  }

  getUsers() {
   return this.http.get('http://localhost:3000/users')
   .map(result => result.json());
  }

  register(user: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/users',
     body, {
      headers: headers
    }).map(res => res.json());
  }
}
