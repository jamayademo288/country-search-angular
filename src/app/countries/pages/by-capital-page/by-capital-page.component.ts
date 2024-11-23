import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false; //
  public initialValue: string = '';

  constructor(
    private capital: CountryService
  ) { }

  ngOnInit(): void {
    this.countries = this.capital.cacheStore.byCapital.countries
    this.initialValue = this.capital.cacheStore.byCapital.term;
  }

  searchByCapital( term: string ) {
    console.log('entra')
    this.isLoading = true;
    this.capital.searchCapital( term ).subscribe( resp => {
      this.isLoading = false;
      this.countries = resp;
      console.log({ resp });

    })
  }
}
