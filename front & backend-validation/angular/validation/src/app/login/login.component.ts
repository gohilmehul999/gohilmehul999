import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginform: FormGroup;
  islogin = false;
  errors: any;
  msg: any;
  constructor(private api: ApiService) {
    this.loginform = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'
        ),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
        ),
      ]),
    });
  }

  lofinform() {
    var data = this.loginform.value;
    console.log(data);
    this.islogin = true;
    this.errors = null;
    this.api.getloginapi(data).subscribe(
      (data) => {
        // console.log(data)
        this.msg = data;
      },
      (err) => {
        this.errors = err;
      }
    );
  }

  get email() {
    return this.loginform.get('email');
  }

  get password() {
    return this.loginform.get('password');
  }
  ngOnInit(): void {}
}
