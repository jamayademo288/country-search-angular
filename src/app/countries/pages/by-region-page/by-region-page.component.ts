import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = []; //
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']; //
  public selectedRegion?: Region; //
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(
    private capital: CountryService
  ) { }

  ngOnInit(): void {
    this.countries = this.capital.cacheStore.byRegion.countries
    this.initialValue = this.capital.cacheStore.byRegion.region;
  }

  searchRegion( term: Region ) {
    this.selectedRegion = term;
    this.isLoading = true;
    this.capital.searchRegion( term ).subscribe( resp => {
      this.isLoading = false;
      this.countries = resp;
      console.log({ resp });
    })
  }
}
