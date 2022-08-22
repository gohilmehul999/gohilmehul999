import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'to-do-list';
  list:any[]=[];
  getvalue(get: any) {
    // console.log(get);
  const obj=[{id:this.list.length,name:get}]
    this.list.push(obj);
console.log(this.list);
  }
  remove(id:any){
 console.log(id);
 console.log(this.list=this.list.filter(item => item.id!==id));
  }

  // data=212;
  student=[{id:'1',name:'mehul'},{id:'1',name:'mehul'},{id:'1',name:'mehul'}]
name:any;
}
