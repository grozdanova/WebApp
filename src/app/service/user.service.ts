import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastrService } from 'toastr-ng2';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  loggedUser: string = '';
data;
  constructor(private http: Http, private toastrService: ToastrService, private router: Router) { }

  getLoggedUser(): string {
    this.loggedUser = localStorage.getItem('web-user');
    return this.loggedUser;
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be79655-7ef7d7bf9d20')); 
  }

  getUsers() {
   return this.http.get('http://localhost:3000/users')
   .map(result => result.json());
  }
  getUser() {
    // return this.http.get('http://localhost:3000/users?email=' + email)
    // .map(result => result.json());
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


  logout() {
    localStorage.removeItem('web-user');
    this.toastrService.success('Succesfully logged out!');
    this.router.navigate(['/home']);
  }

}
