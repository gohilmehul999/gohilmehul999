import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'httpclent';
  displayedColumns: string[] = ['name', 'email', 'mobile', 'address'];
}
