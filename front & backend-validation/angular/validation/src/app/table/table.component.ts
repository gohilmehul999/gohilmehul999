import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  table: any;
  constructor(private api: ApiService, private route: Router) {}
  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this.api.getapi().subscribe((result) => {
      this.table = result;
    });
  }
  remove(id: any) {
    this.api.rmvapi(id).subscribe((result: any) => {
      console.log(result);
    });
    alert('delete');
    this.getdata();
  }

  update(id: any) {
    this.route.navigate(['reactive/', id]);
  }
  view(id: any) {
    this.route.navigate(['view/', id]);
  }

  displayedColumns = [
    'id',
    'name',
    'email',
    'mobile',
    'image',
    'view',
    'update',
    'delete',
  ];
}
