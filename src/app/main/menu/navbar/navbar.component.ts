import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'menu-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() nameForMenu:string;

  constructor() { }

  ngOnInit() { }

}