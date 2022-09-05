import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  selectedvalue = ''
  options: string[] = ['angular','react','node'];
  amount:any = 120;
  constructor() { }

  ngOnInit(): void {
  }

}
