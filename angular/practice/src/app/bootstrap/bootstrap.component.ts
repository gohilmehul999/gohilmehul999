import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css'],
})
export class BootstrapComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  image3 = 'https://demos.creative-tim.com/material-kit/assets-old/img/bg3.jpg';
  image2 = 'https://demos.creative-tim.com/material-kit/assets-old/img/bg2.jpg';
  image1 = 'https://demos.creative-tim.com/material-kit/assets-old/img/bg.jpg';

  open(content: any) {
    this.modalService.open(content);
  }
name:any=12
page:any=4;
meridian=true;
pageSize:any=100;
current = 8;
table=[{id:1,name:'mehul  '},
{id:2,name:'mehul gohil'}]
time = {hour: 13, minute: 30};
toggle(){
  this.meridian=!this.meridian;
}
show=true
public mode:any
}
