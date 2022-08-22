import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private fireauth: AuthService,private router:Router) {}

  ngOnInit(): void {}
  register() {
    if (this.email == '') {
      alert('enter email');
      return;
    } else if (this.password == '') {
      alert('enter password');
      return;
    }
    this.fireauth.register(this.email, this.password);
    this.router.navigate(['signin'])
    this.email = '';
    this.password = '';
  }
}
