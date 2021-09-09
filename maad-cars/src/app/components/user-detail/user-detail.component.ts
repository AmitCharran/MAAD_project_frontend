import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { current_user_id } from '../../global';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user? : User;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() : void {
    this.userService.getUserById(current_user_id)
      .subscribe(user => this.user = user);
  }

  updateUser() : void {
    if(this.user){
      this.userService.updateUser(this.user)
        .subscribe(user => this.user = user);
    }   
  }
}
