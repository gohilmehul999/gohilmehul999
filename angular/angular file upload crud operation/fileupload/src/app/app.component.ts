import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'fileupload';
  name:string ="";
  file:any;
  getname(name:string){
this.name = name;
console.log(this.name);
  }
  getfile(event:any){
this.file = event.target.files[0].name;
// console.log(this.file);

  }
}
