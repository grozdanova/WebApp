import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../app/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loggedUser = this.userService.getLoggedUser();
  }
  ngDoCheck() {
    this.loggedUser = this.userService.getLoggedUser();
  }

  logout(): void {
    this.userService.logout();
    this.loggedUser = '';
  }
}
