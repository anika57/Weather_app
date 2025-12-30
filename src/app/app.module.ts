import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule, 
    HttpClientModule, 
    FormsModule,
    AppComponent,
    SearchBarComponent,
    CurrentWeatherComponent
  ],
  bootstrap: []
})
export class AppModule {}
