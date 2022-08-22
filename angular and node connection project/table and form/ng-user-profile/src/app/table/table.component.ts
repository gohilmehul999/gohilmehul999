import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLinkActive } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor(private api: ApiService, private route: Router) {}

  table: any;

  ngOnInit(): void {
    this.getuserinfo();
  }

  getuserinfo() {
    this.api.getuserinfo().subscribe((result) => {
      this.table = result;
      console.log(this.table);
    });
  }

  edite(id: any) {
    this.route.navigate(['edit/', id]);
  }

  deletinfo(id: any) {
    this.api.deleteuserinfo(id).subscribe((data) => {
      console.log(data);
    });
    alert('deleted');
    this.getuserinfo();
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
    'image',
    'opration',
    'opration2',
  ];
}
