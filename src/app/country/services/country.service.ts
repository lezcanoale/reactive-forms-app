import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { CountryResponse } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regions = ['Americas', 'Africa', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<CountryResponse[]> {
    if (!region) return of([]);
    const url = `${this.baseUrl}/region/${region}?fields=name,cca3,borders`;
    return this.http.get<CountryResponse[]>(url);
  }

  getBordersByCode(code: string): Observable<CountryResponse> {
    if (!code) return of();
    const url = `${this.baseUrl}/alpha/${code}?fields=name,cca3,borders`;
    return this.http.get<CountryResponse>(url);
  }
}
