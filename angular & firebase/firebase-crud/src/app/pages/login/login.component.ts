import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private fireauth: AuthService) {}
  ngOnInit(): void {}
  login() {
    if (this.email == '') {
      alert('enter email');
      return;
    } else if (this.password == '') {
      alert('enter password');
      return;
    }
    this.fireauth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
