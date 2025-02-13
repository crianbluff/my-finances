import { Component, Input } from '@angular/core';

@Component({
  selector: 'sh-card',
  templateUrl: './sh-card.component.html',
  styleUrls: ['./sh-card.component.css']
})
export class ShCardComponent {

  @Input() titleShCard:string;
  @Input() txtShCard:string;
  @Input() totalShCard:number;
  @Input() amountShCard:number;

  @Input() bgShCard:string;
  @Input() iconClassShNameCard:string;

  constructor() { }
  
}