import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { ShowNumbersComponent } from './show-numbers/show-numbers.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ShowNumbersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
