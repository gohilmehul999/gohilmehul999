import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  reactfrom: FormGroup;
  show = false;
  comformshow = false;
  match: any;
  notmatch: any;
  comformvalue: any;
  images: any;
  params: any;
  contact: any;
  acceptimg = 'image/x-png,image/gif,image/jpeg';
  constructor(private api: ApiService, private router: ActivatedRoute) {
    this.reactfrom = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      comformpassword: new FormControl('', [
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
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'
        ),
        Validators.email,
      ]),
      file: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.params = this.router.snapshot.params.id;
    if (this.params) {
      this.api.getapi1(this.params).subscribe((data: any) => {
        console.log('data fetch', data);
        this.reactfrom.setValue({
          name: data.name,
          password: data.password,
          mobile: data.mobile,
          email: data.email,
          id: data._id,
          comformpassword: data.password,
          file: data.file,
        });
      });
    }
  }



  filefetch(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images);
    }
  }

  submit(event: any) {
    if (this.params) {
      const formdata = new FormData();
      formdata.append('name', this.name?.value);
      formdata.append('mobile', this.mobile?.value);
      formdata.append('email', this.email?.value);
      formdata.append('password', this.password?.value);
      formdata.append('file', this.images);

      this.api.updateapi(this.params, formdata).subscribe((data) => {});

      alert('update');
    } else {
      const formdata = new FormData();
      formdata.append('name', this.name?.value);
      formdata.append('mobile', this.mobile?.value);
      formdata.append('email', this.email?.value);
      formdata.append('password', this.password?.value);
      formdata.append('file', this.images);

      this.api.postapi(formdata).subscribe((data) => {
        alert('alert:' + data);
        console.log(data);
      });

      console.log(formdata);
      alert('inserted');
    }
  }

  onlydigit(event: any) {}

  togglePasswordVisibility() {
    this.show = !this.show;
  }
  conformtogglePasswordVisibility() {
    this.comformshow = !this.comformshow;
  }

  passwordvalidation(event: any) {
    this.match = event;
    this.comformvalue = this.reactfrom.get('password')?.value;
  }

  passwordvalidationcnfm(comform: any) {
    console.log(comform);
    this.notmatch = this.reactfrom.get('comformpassword')?.value;
  }

  get name() {
    return this.reactfrom.get('name');
  }
  get file() {
    return this.reactfrom.get('file');
  }
  get address() {
    return this.reactfrom.get('address');
  }
  get mobile() {
    return this.reactfrom.get('mobile');
  }
  get email() {
    return this.reactfrom.get('email');
  }
  get password() {
    return this.reactfrom.get('password');
  }
  get comformpassword() {
    return this.reactfrom.get('comformpassword');
  }
}
