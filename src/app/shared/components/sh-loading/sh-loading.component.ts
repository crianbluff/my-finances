import { Component, Input } from '@angular/core';

@Component({
  selector: 'sh-loading',
  templateUrl: './sh-loading.component.html',
  styleUrls: ['./sh-loading.component.css']
})
export class ShLoadingComponent {

  @Input() shLoadingText:string = '';

  constructor() { }
  
}