import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import {Validator} from '../validator';
import { ToastrService } from 'toastr-ng2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {
  data: any;
  user = {email: '', password: ''};
current;
  constructor(private userService: UserService, private toastrService: ToastrService, private router: Router) {
    this.userService.getUsers().subscribe(users => this.data = users);
   }

  ngOnInit() {

  }

  login() {
    console.log(this.data);
    let searched = false;
    for (let i = 0; i < this.data.length; i++) {
      let element = this.data[i];
      if (element.email === this.user.email && element.password === this.user.password) {
        this.current = element;
        searched = true;
      }
    }
    if (searched === true) {
      // localStorage.setItem('web-user', this.user.email);
      localStorage.setItem('web-user', JSON.stringify(this.current));
      console.log(localStorage);
      this.toastrService.success('Succesfully login!');
      this.router.navigate(['/home']);
      console.log(this.current);
    } else {
      this.toastrService.error('Wrong email / password!');
    }
  }
}
