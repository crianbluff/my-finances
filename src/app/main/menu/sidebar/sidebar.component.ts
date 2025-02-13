import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'menu-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  @Input() isCollapsed:boolean = true;
  @Output() captureClickCollapsed = new EventEmitter();
  @Output() captureClickLogOut: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('menu', { static: true }) sidebar:ElementRef;

  constructor() { }

  ngOnInit() { }

  toggleMenu() {
    this.captureClickCollapsed.emit({sideBarEl: this.sidebar});
  }

}