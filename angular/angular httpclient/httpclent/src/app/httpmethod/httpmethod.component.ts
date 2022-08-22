import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-httpmethod',
  templateUrl: './httpmethod.component.html',
  styleUrls: ['./httpmethod.component.css'],
})
export class HttpmethodComponent implements OnInit {

  table: any;

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.getdetails();
  }

  edit(id: any) {
    // console.log(id);
    this.router.navigate(['/put', id]);
  }

  delet(id: any) {
    this.api.deletedata(id).subscribe((result: any) => {
      result == id;
    });
    alert('deleted data');
    this.getdetails();
  }
  getdetails(){
    this.api.getdata().subscribe((data) => {
      this.table = data;
      console.log(this.table);
    });
  }

  displayedColumns = [
    'no',
    'firstname',
    'lastname',
    'mobile',
    'email',
    'date',
    'city',
    'pincode',
    'state',
    'password',
    'opration',
    'opration2',
  ];


}
