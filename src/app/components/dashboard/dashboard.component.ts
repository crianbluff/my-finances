import { Component, OnInit } from '@angular/core';
import { EntryEgressService } from 'src/app/services/entry-egress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor( public entryEgressServices: EntryEgressService ) { }

  ngOnInit() {
    this.entryEgressServices.initEntryEgressListener();
  }

}