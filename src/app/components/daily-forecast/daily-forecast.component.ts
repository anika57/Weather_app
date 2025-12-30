import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.css'],
})
export class DailyForecastComponent {
  @Input() weather: any;
  @Input() units!:  {
    temp: 'c' | 'f';
    speed: 'kmh' | 'mph';
    precip: 'mm' | 'in';
  };
  @Input() helpers!: any;


  getTemp(temp: number): number {
    return this.units.temp === 'f' ? temp * 9 / 5 + 32 : temp;
  }

  toF(c: number): number {
    return Math.round((c * 9) / 5 + 32);
  }

  toMph(kmh: number): number {
    return Math.round(kmh / 1.609);
  }

  toInches(mm: number): number {
    return +(mm / 25.4).toFixed(2);
  }

  getWeatherIcon(code: number): string {
    if (code === 0) return 'images/icon-sunny.webp';
    if ([1, 2].includes(code)) return 'images/icon-partly-cloudy.webp';
    if (code === 3) return 'images/icon-overcast.webp';
    if ([45, 48].includes(code)) return 'images/icon-fog.webp';
    if ([51, 53, 55].includes(code)) return 'images/icon-drizzle.webp';
    if ([61, 63, 65].includes(code)) return 'images/icon-rain.webp';
    if ([71, 73, 75].includes(code)) return 'images/icon-snow.webp';
    if ([95, 96, 99].includes(code)) return 'images/icon-storm.webp';

    return 'images/icon-sunny.webp';
  }

  getDayName(index: number): string {
    const d = new Date();
    d.setDate(d.getDate() + index);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  }
}
