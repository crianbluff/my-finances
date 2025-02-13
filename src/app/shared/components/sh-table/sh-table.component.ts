import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sh-table',
  templateUrl: './sh-table.component.html',
  styleUrls: ['./sh-table.component.css']
})
export class ShTableComponent {
  
  @Input() shTableItems:string[];
  @Output() shBtnDeleteCaptureClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
}