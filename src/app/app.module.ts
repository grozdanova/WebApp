import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { ToastrModule } from 'toastr-ng2';
import { CommonModule } from '@angular/common';

// import { firebaseConfig } from '../environments/firebase.config';
import { UserService } from './service/user.service';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  {path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'profile', component: UserProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    ToastrModule.forRoot()

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
