import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  constructor( public authService: AuthService ) { }

  ngOnInit() {
    this.authService.initAuthListener();
  }

}