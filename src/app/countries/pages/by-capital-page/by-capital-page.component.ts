import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { CountryPathENUM } from '../../interfaces/path-countries.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(
    private countriesService: CountriesService
  ){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(term: string):void{
    this.isLoading = true;
    this.countriesService.searchByTermAndPath(term, CountryPathENUM.BYCAPITAL).subscribe({
      next: (data) => {
        this.countries = data;
        this.isLoading = false;

      }
    })
  }
}
