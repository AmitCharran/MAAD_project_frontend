import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as global from 'src/app/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  input : User = {
    "username" : "",
    "password" : "",
    "user_id" : 0,
    "firstName" : "",
    "lastName" : "",
    "email" : ""
  };

  createUserAccount(): void {
    this.userService.createUser(this.input)
    .subscribe(user => {global.setCurrentUserId(user.user_id);
                        this.router.navigateByUrl("/user"); 
                      }); 
  }
}
