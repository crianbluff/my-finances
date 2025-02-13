import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-core',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class CoreComponent implements OnInit {

  constructor( public authService: AuthService ) { }

  ngOnInit() {
    this.authService.initAuthListener();
  }

}