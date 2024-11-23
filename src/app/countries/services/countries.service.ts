import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountryService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
   }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore ) );
  }

  private loadFromLocalStorage() {
    if( !localStorage.getItem('cacheStore') ) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  private getHttpRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( err => of([]) ),
        delay(2000)
      )
  }

  searchCountryAlphaCode( code: string ): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${ code }`;
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( err => of(null) ),
      )
  }

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${ term }`;
    return this.getHttpRequest( url )
     .pipe(
        tap( countries => this.cacheStore.byCapital = { term: term, countries: countries } ),
        tap( () => this.saveToLocalStorage() ),
     )
  }

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${ term }`;
    return this.getHttpRequest( url )
     .pipe(
        tap( countries => this.cacheStore.byCountries = { term: term, countries: countries } ),
        tap( () => this.saveToLocalStorage() ),
     )
  }

  searchRegion( term: Region ): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${ term }`;
    return this.getHttpRequest( url )
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region: term, countries: countries } ),
      tap( () => this.saveToLocalStorage() ),
   )
  }

}
