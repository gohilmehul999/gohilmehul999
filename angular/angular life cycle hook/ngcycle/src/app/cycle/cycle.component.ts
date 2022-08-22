import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css'],
})
export class CycleComponent implements OnInit ,OnChanges, DoCheck {

  constructor() {
    console.log('contructor called');
  }

  ngOnInit(): void {
    console.log('ngoninit are called')
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngonchanges are called')
  }
ngDoCheck(): void {
  console.log('docked called')
}
ngAfterContentChecked(): void {
  //Called after every check of the component's or directive's content.
  //Add 'implements AfterContentChecked' to the class.
  console.log('after content checked')
}
ngAfterContentInit(): void {
  //Called after ngOnInit when the component's or directive's content has been initialized.
  //Add 'implements AfterContentInit' to the class.
  console.log('after content initialize')
}
ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  console.log('after view initialize')
}
ngAfterViewChecked(): void {
  //Called after every check of the component's view. Applies to components only.
  //Add 'implements AfterViewChecked' to the class.
  console.log('after view checked')
}
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  console.log('on destroy')
}
}
