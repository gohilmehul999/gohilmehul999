import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practice';
  panelOpenState = false;
  showFiller = false;
    constructor(public dialog:MatDialog, private snackbar:MatSnackBar) { }

  opendialogbox(){
this.dialog.open(DialogComponent,{width:'250px'})
  }
  opensnackbar(msg:string,action:string){
    this.snackbar.open(msg,action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }
  items=['item1','item2']
  choices=['choice1','choice2']
  modelName = 'name'
  rippleradius=12
  choices2=['choice1','choice2']
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

}
