import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-imagetbl',
  templateUrl: './imagetbl.component.html',
  styleUrls: ['./imagetbl.component.css'],
})
export class ImagetblComponent implements OnInit {
  table: any;
  images: any;
  displayedColumns = ['id', 'name', 'path', 'operation', 'operation2'];
  filepath: any;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this.api.getimage().subscribe((data: any) => {
      this.table = data;
      console.log(data);
    });
  }

  postdata(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
    const formdata = new FormData();
    // var data = event.target.files[0];
    formdata.append('user_file', this.images);
    console.log(formdata);
    // console.log(event.target.files[0].name);
    this.api.postimage(formdata).subscribe((result) => {
      console.log(result);
    });
    alert('file post');
    this.getdata();
  }

  deleteimg(id: any) {
    // console.log(id);
    this.api.deleteimage(id).subscribe((result) => {
      console.log(result);
      this.getdata();
    });
  }

  updateimg(id: any) {
    console.log(id);
    const formdata = new FormData();
    formdata.append('user_file', this.images);
    console.log(formdata);
    this.api.putimage(id, formdata).subscribe((result) => {
      console.log(result);
    });

  }

  fetch(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
}
