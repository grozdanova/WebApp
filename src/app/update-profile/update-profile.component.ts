import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ToastrService } from 'toastr-ng2';
import { Router } from '@angular/router';
import { Validator } from '../validator';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  loggedUser;
  currentUser;
  countries = [
    { name: 'Bulgaria' },
    { name: 'Canada' },
    { name: 'France' },
    { name: 'USA' }
  ];
  selectedCountry;
  data: any;
  constructor(private userService: UserService, private toastrService: ToastrService, private router: Router) {
    this.userService.getUsers().subscribe(users => this.data = users);
  }

  ngOnInit() {
    this.loggedUser = this.userService.getLoggedUser();
    this.currentUser = JSON.parse(this.loggedUser);
    this.selectedCountry = this.currentUser.country;
  }

  onChangeObj(newObj) {
    this.selectedCountry = newObj;
    // console.log(this.selectedCountry);
  }

  changeUsername() {
    if (!Validator.validateName(this.currentUser.username)) {
      this.toastrService.error('Username is not in the correct format!');
      return;
    }
    if (!Validator.validateUniqueName(this.data, this.currentUser.username)) {
      this.toastrService.error('This username is already exist!');
      return;
    }
    let changes = {
      username: this.currentUser.username
    };

    this.userService.updateProfile(this.currentUser.id, changes).subscribe(
      data => {
        this.toastrService.success('Succesfully update your profile! Changes will be apply after you logout!');
        this.router.navigate(['/profile']);
      });
  }
  changePassword(pass, confirmPass) {
    if (!Validator.validatePass(pass)) {
      this.toastrService.error('Password must be at least 5 symbols!');
      return;
    }
    if (!Validator.validatePass(confirmPass)) {
      this.toastrService.error('Confirm password must be at least 5 symbols!');
      return;
    }
    if (!Validator.validateConfirm(pass, confirmPass)) {
      this.toastrService.error('Two passwords are not equal!');
      return;
    }
    let changes = {
      password: pass
    };
    this.userService.updateProfile(this.currentUser.id, changes).subscribe(
      data => {
        this.toastrService.success('Succesfully change your password!');
        this.router.navigate(['/profile']);
      });
  }
  changePhone(phone) {
    if (!Validator.validatePhone(phone)) {
      this.toastrService.error('Phone number must be between 6 and 15 digits long!');
      return;
    }
    let changes = {
      phone: phone
    };
    this.userService.updateProfile(this.currentUser.id, changes).subscribe(
      data => {
        this.toastrService.success('Succesfully change your phone number! Changes will be apply next time!');
        this.router.navigate(['/profile']);
      });
  }
  changeCountry() {
    let changes = {
      country: this.selectedCountry
    };
    this.userService.updateProfile(this.currentUser.id, changes).subscribe(
      data => {
        this.toastrService.success('Succesfully change your country! Changes will be apply next time!');
        this.router.navigate(['/profile']);
      });
  }

}
