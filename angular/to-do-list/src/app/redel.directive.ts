import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appRedel]'
})
export class RedelDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.color="red"
   }

}
