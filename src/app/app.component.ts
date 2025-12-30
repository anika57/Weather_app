import { Component, ElementRef, HostListener } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';

type TempUnit = 'c' | 'f';
type SpeedUnit = 'kmh' | 'mph';
type PrecipUnit = 'mm' | 'in';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    SearchBarComponent,
    CurrentWeatherComponent,
    HourlyForecastComponent,
    DailyForecastComponent,
  ],
})
export class AppComponent {
  weatherData: any;
  showUnits = false;

  units = {
    temp: 'c' as TempUnit,
    speed: 'kmh' as SpeedUnit,
    precip: 'mm' as PrecipUnit,
  };

  constructor(private weatherService: WeatherService,  private elRef: ElementRef) {}

  // 🔁 SEARCH
  onSearch(city: string) {
    this.weatherService.getCoordinates(city).subscribe((res) => {
      if (!res.results?.length) return;

      const { latitude, longitude, name, country } = res.results[0];

      this.weatherService
        .getWeather(latitude, longitude, 'metric')
        .subscribe((data) => {
          this.weatherData = {
            ...data,
            location: `${name}, ${country}`,
          };
        });
    });
  }

  // 🔥 UNIT TOGGLES
  toggleTempUnit() {
  this.units = {
    ...this.units,
    temp: this.units.temp === 'c' ? 'f' : 'c',
  };
}

toggleSpeedUnit() {
  this.units = {
    ...this.units,
    speed: this.units.speed === 'kmh' ? 'mph' : 'kmh',
  };
}

togglePrecipUnit() {
  this.units = {
    ...this.units,
    precip: this.units.precip === 'mm' ? 'in' : 'mm',
  };
}

setTempUnit(unit: TempUnit) {
  this.units = {
    ...this.units,
    temp: unit,
  };
}

setSpeedUnit(unit: SpeedUnit) {
  this.units = {
    ...this.units,
    speed: unit,
  };
}

setPrecipUnit(unit: PrecipUnit) {
  this.units = {
    ...this.units,
    precip: unit,
  };
}

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  if (!this.elRef.nativeElement.contains(event.target)) {
    this.showUnits = false;
  }
}

toggleUnits() {
  this.showUnits = !this.showUnits;
}


}
