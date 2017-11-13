import { Component, OnInit, ViewContainerRef, Injectable } from '@angular/core';
import { Validator } from '../validator';
import { Jsonp, URLSearchParams, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ToastrService } from 'toastr-ng2';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

@Injectable()
export class RegisterComponent {
  currentUser;
  id: string;
  user = {
    name: '', password: '', confirmPass: '', email: '', phone: '', country: [
      { name: 'Bulgaria' },
      { name: 'Canada' },
      { name: 'France' },
      { name: 'USA' }
    ]
  };
  selectedCountry = this.user.country[0];
  data: any;

  onChangeObj(newObj) {
    this.selectedCountry = newObj;
  }

  constructor(private toastrService: ToastrService, private router: Router, private userService: UserService) {
    this.userService.getUsers().subscribe(users => this.data = users);
  }

  register() {
    let lastUser = this.data[this.data.length - 1];

    if (!Validator.validateName(this.user.name)) {
      this.toastrService.error('Username is not in the correct format!');
      return;
    }
    if (!Validator.validateUniqueName(this.data, this.user.name)) {
      this.toastrService.error('This username is already exist!');
      return;
    }
    if (!Validator.validateEmail(this.user.email)) {
      this.toastrService.error('Email is not in the correct format!');
      return;
    }
    if (!Validator.validateUniqueMail(this.data, this.user.email)) {
      this.toastrService.error('This email is already exist!');
      return;
    }
    if (!Validator.validatePass(this.user.password)) {
      this.toastrService.error('Password must be at least 5 symbols!');
      return;
    }
    if (!Validator.validatePass(this.user.confirmPass)) {
      this.toastrService.error('Confirm password must be at least 5 symbols!');
      return;
    }
    if (!Validator.validateConfirm(this.user.password, this.user.confirmPass)) {
      this.toastrService.error('Two passwords are not equal!');
      return;
    }
    if (!Validator.validatePhone(this.user.phone)) {
      this.toastrService.error('Phone number must be between 6 and 15 digits long!');
      return;
    }

    let user = {
      id: lastUser.id + 1,
      username: this.user.name,
      password: this.user.password,
      email: this.user.email,
      country: this.selectedCountry,
      phone: this.user.phone
    };
    this.currentUser = user;
    this.userService.register(user).subscribe(
      data => {
        this.toastrService.success('Succesfully registered!');
        this.router.navigate(['/home']);
      });
  }

}



