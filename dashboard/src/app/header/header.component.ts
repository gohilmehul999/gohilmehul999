import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: string = 'mehul';
  profiledata: any;

  constructor(private api: ApiserviceService) {}

  ngOnInit(): void {
    this.getprofile();
  }
  getprofile() {
    this.api.profile().subscribe((data:any) => {
      this.profiledata = data;

    });
  }
}
