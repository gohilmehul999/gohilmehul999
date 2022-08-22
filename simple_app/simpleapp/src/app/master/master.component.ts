import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from '../service/auth-token.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})
export class MasterComponent implements OnInit {
  showFiller = false;
  constructor(private token: AuthTokenService, private route: Router) {}

  ngOnInit(): void {}
  logout() {
    var x = confirm('are u sure!');
    if (x) {
      this.token.removetoken();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.route.navigate(['/']);
    }
  }
}
