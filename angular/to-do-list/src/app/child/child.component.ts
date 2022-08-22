import { Component, Input, OnInit, Directive, ElementRef } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})

export class ChildComponent implements OnInit {
  constructor()
  {

  }
  @Input() student: { id: string; name: string } = { id: '', name: '' };
  ngOnInit(): void {}
}
