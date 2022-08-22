import { Component } from '@angular/core';
import { UsersdataService } from './service/usersdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'apidata';
  users: any;
  constructor(private userdata: UsersdataService) {
    userdata.users().subscribe((data) => {
      // console.warn(data);
      this.users = data;
      // console.log(this.users);
    });
  }
  submit(data: any) {
    console.log(data);
    this.userdata.saveusers(data).subscribe((result) => {
      console.log(result);
    });
  }
}
