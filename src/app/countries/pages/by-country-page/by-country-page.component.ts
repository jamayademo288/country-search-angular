import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = []; //
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(
    private capital: CountryService
  ) { }

  ngOnInit(): void {
    this.countries = this.capital.cacheStore.byCountries.countries
    this.initialValue = this.capital.cacheStore.byCountries.term;
  }

  searchCountry( term: string ) {
    this.isLoading = true;
    this.capital.searchCountry( term ).subscribe( resp => {
      this.isLoading = false;
      this.countries = resp;
      console.log({ resp });
    })
  }
}
