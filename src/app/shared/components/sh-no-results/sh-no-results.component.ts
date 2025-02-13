import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sh-no-results',
  templateUrl: './sh-no-results.component.html',
  styleUrls: ['./sh-no-results.component.css']
})
export class ShNoResultsComponent {

  @Input() shTxtNoResults:string;
  @Input() shTxtBtnNoResults:string;

  constructor(public router: Router) { }
  
}