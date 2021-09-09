import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import * as global from 'src/app/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService,
              private router : Router) { }

  username : string = "";
  password : string = "";
  input : User = {
    "username" : this.username,
    "password" : this.password,
    "user_id" : 0,
    "firstName" : "",
    "lastName" : "",
    "email" : ""
  };
  

  ngOnInit(): void {
  }

  login() : void {
    this.input.username = this.username;
    this.input.password = this.password; 
    this.userService.loginUser(this.input)
    .subscribe(user => global.setCurrentUserId(user.user_id));
    this.router.navigateByUrl("/vehicles");
  }
}
