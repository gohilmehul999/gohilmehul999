import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  mgform: FormGroup;
  msg: any;
  data: any;
  message:any;
  constructor(private router: Router, private api: ApiserviceService) {
    this.mgform = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  //Buttons clicks functionalities
  user_register() {
    this.router.navigate(['registartion']);
  }

  user_login() {
    this.data = this.mgform.value;
    // console.log(this.data);
    this.api.login(this.data).subscribe((data) => {
      this.msg = data;
      console.log(this.msg.message);
      this.message = this.msg.message
      if (this.msg.status === 200 && this.msg.success === true) {
        localStorage.setItem('x-access-token', this.msg.token);
        this.router.navigate(['admin']);
      }
    });
  }
}
