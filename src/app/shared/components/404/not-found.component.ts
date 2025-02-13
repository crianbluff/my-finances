import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  @Input() titleNotFound:string = '404';
  @Input() subtitleNotFound:string = 'Page Not Found';
  @Input() msgNotFound:string = 'It looks like the page that you are searching does not exist';
  @Input() isComingFromAuthPage:boolean = true;

  constructor(public router: Router) { }

}