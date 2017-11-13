import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { Validator } from '../validator';
import { ToastrService } from 'toastr-ng2';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {
  data: any;
  user = { email: '', password: '' };
  current;
  checkbox;

  constructor(private userService: UserService, private toastrService: ToastrService, private router: Router) {
    this.userService.getUsers().subscribe(users => this.data = users);
  }

  ngOnInit() {
    this.user.email = this.getCookie('email');
  }

  login() {
    let searched = false;
    for (let i = 0; i < this.data.length; i++) {
      let element = this.data[i];
      if (element.email === this.user.email && element.password === this.user.password) {
        this.current = element;
        searched = true;
      }
    }
    if (searched === true) {
      if (this.checkbox === true) {
        this.setCookie('email', this.user.email, 365);
      }
      localStorage.setItem('web-user', JSON.stringify(this.current));
      this.toastrService.success('Succesfully login!');
      this.router.navigate(['/home']);
    } else {
      this.toastrService.error('Wrong email / password!');
    }
  }
  setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }
  getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
