import { ViewChild } from '@angular/core';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent implements AfterViewInit {

  constructor(private api: ApiService) {}

  @ViewChild('page') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort
  table: any;
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  dataSource = new MatTableDataSource();
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.api.getdata().subscribe((data) => {
      // console.log(data);
      this.table = data;
      this.dataSource = new MatTableDataSource(this.table);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  filterdata(evenet:any){
    this.dataSource.filter = evenet.target.value;
  }
}
