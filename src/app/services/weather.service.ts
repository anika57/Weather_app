import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  /**
   * Get coordinates for a city
   */
  getCoordinates(city: string) {
    return this.http.get<any>(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
  }

  /**
   * Get weather for latitude & longitude
   * @param lat latitude
   * @param lon longitude
   * @param unit 'metric' or 'imperial'
   */
getWeather(lat: number, lon: number, unit: string) {
  const isImperial = unit === 'imperial';

  const params = new HttpParams()
    .set('latitude', lat)
    .set('longitude', lon)
    .set('timezone', 'auto')

    // CURRENT
    .set('current_weather', 'true')

    // HOURLY (needed for humidity, precipitation, feels like)
    .set(
      'hourly',
      [
        'temperature_2m',
        'apparent_temperature',
        'relativehumidity_2m',
        'precipitation',
        'weathercode',
        'windspeed_10m',
      ].join(',')
    )

    // DAILY
    .set(
      'daily',
      'temperature_2m_max,temperature_2m_min,weathercode'
    )

    // UNITS
    .set('temperature_unit', isImperial ? 'fahrenheit' : 'celsius')
    .set('windspeed_unit', isImperial ? 'mph' : 'kmh')
    .set('precipitation_unit', isImperial ? 'inch' : 'mm');

  return this.http.get('https://api.open-meteo.com/v1/forecast', { params });
}

}
