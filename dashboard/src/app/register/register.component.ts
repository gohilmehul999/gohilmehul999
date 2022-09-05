import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userlogin = true;
  userregister = false;
  constructor() { }

  ngOnInit(): void {
  }
  user_login()
  {
    this.userlogin = true;
    this.userregister = false;
  }
}
