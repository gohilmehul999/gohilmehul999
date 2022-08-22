import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  table: any;
  params: any;
  contact: any = {};

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  formpost(data: any) {
    this.api.postdata(data).subscribe((result) => {
      console.log('result', result);
    });
    alert('inserted data');
  }

  formputdata(data: any) {
    this.api.putdata(data, this.params).subscribe((result) => {
      console.log('put data result', result);
    });
    alert('updated data');
  }

  ngOnInit(): void {
    this.params = this.route.snapshot.params.id;

    console.log('params:', this.params);

    if (this.params) {
      this.api.getdataid(this.params).subscribe((data: any) => {
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
}
