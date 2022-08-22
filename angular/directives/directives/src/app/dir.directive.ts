import { Directive ,ElementRef } from '@angular/core';

@Directive({
  selector: '[appDir]'
})
export class DirDirective {

  constructor(element:ElementRef) {
 element.nativeElement.style.color="red";
  }

}
