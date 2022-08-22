import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  contact: any = [];
  images: any;
  params: any;
  constructor(
    private api: ApiService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.params = this.router.snapshot.params.id;
    console.log(this.params);
    if (this.params) {
      this.api.getuserinfoid(this.params).subscribe((data: any) => {
        console.log('data fetch', data);
        this.contact = {
          fname: data.fname,
          lname: data.lname,
          mobile: data.mobile,
          email: data.email,
          dob: data.dob,
          city: data.city,
          pincode: data.pincode,
          state: data.state,
          password: data.password,
        };
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

  // formpost(data: any) {
  //   const formdata = new FormData();
  //   formdata.append('fname', data.fname);
  //   formdata.append('lname', data.lname);
  //   formdata.append('mobile', data.mobile);
  //   formdata.append('email', data.email);
  //   formdata.append('dob', data.dob);
  //   formdata.append('city', data.city);
  //   formdata.append('state', data.state);
  //   formdata.append('pincode', data.pincode);
  //   formdata.append('password', data.password);
  //   formdata.append('file', this.images);
  //   console.log(data.fname);
  //   console.log(formdata);
  //   this.api.postuserinfo(formdata).subscribe((result) => {
  //     console.log(result);
  //   });
  //   alert('data inserted');
  // }

  // formput(data: any) {
  //   const id = this.params;
  //   console.log('id:', this.params);
  //   const formdata = new FormData();
  //   formdata.append('fname', data.fname);
  //   formdata.append('lname', data.lname);
  //   formdata.append('mobile', data.mobile);
  //   formdata.append('email', data.email);
  //   formdata.append('dob', data.dob);
  //   formdata.append('city', data.city);
  //   formdata.append('state', data.state);
  //   formdata.append('pincode', data.pincode);
  //   formdata.append('password', data.password);
  //   formdata.append('file', this.images);
  //   console.log(formdata);
  //   this.api.putuserinfo(id, formdata).subscribe((result) => {
  //     console.log(result);
  //   });
  //   alert('data updated');
  // }

  data(data: any) {
    if (this.params) {
      const id = this.params;
      console.log('id:', this.params);
      const formdata = new FormData();
      formdata.append('fname', data.fname);
      formdata.append('lname', data.lname);
      formdata.append('mobile', data.mobile);
      formdata.append('email', data.email);
      formdata.append('dob', data.dob);
      formdata.append('city', data.city);
      formdata.append('state', data.state);
      formdata.append('pincode', data.pincode);
      formdata.append('password', data.password);
      formdata.append('file', this.images);
      console.log(formdata);
      this.api.putuserinfo(id, formdata).subscribe((result) => {
        console.log(result);
      });
      alert('data updated');
      this.route.navigate(['']);
    } else {
      const formdata = new FormData();
      formdata.append('fname', data.fname);
      formdata.append('lname', data.lname);
      formdata.append('mobile', data.mobile);
      formdata.append('email', data.email);
      formdata.append('dob', data.dob);
      formdata.append('city', data.city);
      formdata.append('state', data.state);
      formdata.append('pincode', data.pincode);
      formdata.append('password', data.password);
      formdata.append('file', this.images);
      console.log(data.fname);
      console.log(formdata);
      this.api.postuserinfo(formdata).subscribe((result) => {
        console.log(result);
      });
      this.route.navigate(['']);
      alert('data inserted');
    }
  }
}
