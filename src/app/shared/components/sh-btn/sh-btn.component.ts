import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sh-btn',
  templateUrl: './sh-btn.component.html',
  styleUrls: ['./sh-btn.component.css']
})
export class ShBtnComponent {

  @Input() shBtnId:string;
  @Input() shBtnClasses:string;
  @Input() shBtnTxt:string;
  @Input() shBtnLoadingTxt:string;
  @Input() shBtnType:string = 'button';
  @Input() itHasloader:boolean = false;
  @Input() isShBtnLoading:boolean = false;
  @Input() isShBtnDisabled:boolean = false;

  @Output() shBtnCaptureClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
  
}