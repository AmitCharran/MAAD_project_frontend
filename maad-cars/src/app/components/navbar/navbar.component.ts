import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { current_user_id } from 'src/app/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isLoggedIn = (current_user_id != 0);
      }
    })
  }

  
}
