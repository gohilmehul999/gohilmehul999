import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  iscard: any;
  count: any = 0;
  data: any = [];
  record: any = [];
  cartlist: any =[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiserviceService
  ) {}

  ngOnInit(): void {
    this.cartlist = [];
    this.api.showorder().subscribe((data) => {
      this.data = data;
      this.record = this.data.message;
    });
    var a = localStorage.getItem('cartdetail');
    console.log(a);
  }

  checkvalue(e: any, data: any) {
    if (e.checked) {
      this.iscard = true;
      this.count = this.count + 1;
      this.cartlist.push(data);
      localStorage.setItem('cartdetail', JSON.stringify(this.cartlist));
    } else {
      this.count = this.count - 1;
      if (this.count === 0) {
        this.iscard = false;
      }
      this.cartlist = this.cartlist.filter((m: any) => m != e.source.value);
      console.log('cartlist', this.cartlist);
      localStorage.setItem('cartdetail', JSON.stringify(this.cartlist));
    }
  }

  cardnow() {
    this.router.navigate(['../cart'], { relativeTo: this.route });
  }
}
