import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userData: any;
  profileform: FormGroup;
  acceptimg = 'image/x-png,image/gif,image/jpeg';
  image: any;
  msg: any;
  type: any;
  constructor(private apiservice: ApiService,private router:Router) {
    this.profileform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.pattern(
          '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}'),
      ]),
    });
  }

  filefetch(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
      console.log(this.image);
    }
  }

  updateprofile(data: any) {
    const form = new FormData();
    // console.log(data.name);
    form.append('name', data.name);
    form.append('email', data.email);
    form.append('password', data.password);
    form.append('mobile', data.mobile);
    form.append('file', this.image);
    this.apiservice.updateprofile(form).subscribe();
    alert('updated');
    this.refresh();
  }
  ngOnInit(): void {
    this.refresh();
  }

  deleteuser() {
    let x = confirm('Are sure delete your account ?');
    if(x == true) {
      this.apiservice.userdelete().subscribe(
        (res: any) => {
          if(res.success) {
            //console.log(res);
           this.apiservice.userlogout();
            setTimeout(() => {
              window.location.reload();
            }, 100);
            this.router.navigate(['']);
          } else {
            this.type = "danger";
            this.msg = res.message;
          }
        }
      )
    } else {
      window.location.reload();
    }

  }

  refresh() {
    this.apiservice.getuser().subscribe((data: any) => {
      // console.log(data.user);
      this.userData = data.user;
      console.log(this.userData);
      this.profileform.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        mobile: this.userData.mobile,
      });
    });
  }
}
