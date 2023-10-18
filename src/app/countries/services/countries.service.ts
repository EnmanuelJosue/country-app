import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { CountryPathENUM } from '../interfaces/path-countries.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: []},
    byCountries: { term: '', countries: []},
    byRegion: { region: '', countries: []}

  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
   }

  searchByTermAndPath( term: string, path: CountryPathENUM ): Observable<Country[]> {
    const url = `${this.apiUrl}/${path}/${term}`;
    return this.http.get<Country[]>(url)
    .pipe(
      tap( countries => {
        if (path === CountryPathENUM.BYCAPITAL) {
          this.cacheStore.byCapital = {
            countries,
            term
          };
        }
        if (path === CountryPathENUM.BYCOUNTRIES) {
          this.cacheStore.byCountries = {
            countries,
            term
          }
        }
        if (path === CountryPathENUM.BYREGION) {
          this.cacheStore.byRegion = {
            countries,
            region: term as Region
          }
        }
      }),
      tap( ()  => this.saveToLocalStorage()),
      catchError(error => {
        if (path === CountryPathENUM.BYCAPITAL) {
          this.cacheStore.byCapital = {
            countries: [],
            term: ''
          };
        }
        if (path === CountryPathENUM.BYCOUNTRIES) {
          this.cacheStore.byCountries = {
            countries: [],
            term: ''
          }
        }
        if (path === CountryPathENUM.BYREGION) {
          this.cacheStore.byRegion = {
            countries: [],
            region: ''
          }
        }

        return of ([])
      }),

      // delay(2000)
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(error => of (null))
    );
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if (!localStorage.getItem('cacheStore')) {
      return
    }
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }


}
