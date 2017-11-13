import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loggedUser;
  currentUser;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loggedUser = this.userService.getLoggedUser();
    this.currentUser = JSON.parse(this.loggedUser);
    // console.log(this.currentUser);
  }

}
