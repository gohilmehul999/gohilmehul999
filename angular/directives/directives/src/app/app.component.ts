import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'directives';
  course = [1,2];
  ishidden = false;
  viewmode='somethinga';
  details=[{name:'mehul'},{name:'gohilmehul'},{name:'mehulgohil'},{name:'mehul254876'},{name:'mehul'},]
  onadd(){
    this.details.push({name:'gmh'})
  }
  onremove(course:any){
    let index = this.course.indexOf(course);
    console.log(index)
    this.details.splice(index,1)
    // console.log(this.details);
  }
  currentClasses:any='one';
  colorval='aqua';
}
