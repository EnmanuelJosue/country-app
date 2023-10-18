import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { CountryPathENUM } from '../../interfaces/path-countries.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(
    private countriesService: CountriesService
  ){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(term: string){
    this.countriesService.searchByTermAndPath(term, CountryPathENUM.BYCOUNTRIES)
      .subscribe({
        next: (data) => {
          this.countries = data;
        }
      })
  }
}