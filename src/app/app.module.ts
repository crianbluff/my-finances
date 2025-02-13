import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { CoreModule } from '@core/core.module';

// Components
import { CoreComponent } from '@core/core.component';

@NgModule({  
  providers: [],
  
  imports: [
    BrowserModule,
    CoreModule
  ],

  bootstrap: [
    CoreComponent
  ]
})
export class AppModule { }