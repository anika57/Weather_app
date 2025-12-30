import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent {
  @Input() weather: any;
  @Input() units!: {
    temp: 'c' | 'f';
    speed: 'kmh' | 'mph';
    precip: 'mm' | 'in';
  };

  get today(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }

  /* ---------------- CURRENT VALUES ---------------- */

  get temperature(): number {
    return Math.round(this.weather?.current_weather?.temperature ?? 0);
  }

  get windSpeed(): number {
    return Math.round(this.weather?.current_weather?.windspeed ?? 0);
  }

  get weatherIcon(): string {
    const code = this.weather?.current_weather?.weathercode;

    if (code === 0) return '/images/icon-sunny.webp';
    if ([1, 2].includes(code)) return '/images/icon-partly-cloudy.webp';
    if (code === 3) return '/images/icon-overcast.webp';
    if ([45, 48].includes(code)) return '/images/icon-fog.webp';
    if ([51, 53, 55].includes(code)) return '/images/icon-drizzle.webp';
    if ([61, 63, 65].includes(code)) return '/images/icon-rain.webp';
    if ([71, 73, 75].includes(code)) return '/images/icon-snow.webp';
    if ([95, 96, 99].includes(code)) return '/images/icon-storm.webp';

    return '/images/icon-sunny.webp';
  }

  /* ---------------- HOURLY VALUES ---------------- */

  get feelsLike(): number {
    return Math.round(
      this.weather?.hourly?.apparent_temperature?.[0] ?? 0
    );
  }

  get humidity(): number {
    return this.weather?.hourly?.relativehumidity_2m?.[0] ?? 0;
  }

  get precipitation(): number {
    return this.weather?.hourly?.precipitation?.[0] ?? 0;
  }
}
