import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent implements OnInit {
  loginform: FormGroup;
  islogin = false;
  msg: any;
  type: any;
  errors: any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router
  ) {
    this.loginform = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
        ),
      ]),
    });
  }
  loginsubform() {
    var data = this.loginform.value;
    this.islogin = true;
    this.errors = null;
    this.api.getloginapi(data).subscribe(
      (data: any) => {
        console.log(data);
        this.msg = data;
        if (data.success === true && data.status === 200) {
          console.log(data);
          localStorage.setItem('x-access-token', data.token);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          alert('login success');
          this.route.navigate(['dashboard']);
        } else {
          this.type = 'danger';
          this.msg = data.message;
        }
      },
      (err) => {
        this.type = 'danger';
        this.msg = err.message;
      }
    );
  }

  get email() {
    return this.loginform.get('email');
  }

  get password() {
    return this.loginform.get('password');
  }

  showmsgreg() {
    alert('coming soon');
  }
  ngOnInit(): void {}
}
