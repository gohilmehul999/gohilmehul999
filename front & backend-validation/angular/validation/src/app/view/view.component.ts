import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  params: any;
  table: any = [];
  constructor(private router: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.params = this.router.snapshot.params.id;
    if (this.params) {
      this.api.getapi1(this.params).subscribe((data: any) => {
        console.log('data fetch', data);
          this.table = {
            name: data.name,
            password: data.password,
            mobile: data.mobile,
            email: data.email,
            id: data._id,
            comformpassword: data.password,
            file: data.file_path,
          };
      });
    }
  }
}
