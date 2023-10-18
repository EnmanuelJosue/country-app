import { Component } from '@angular/core';
import { RoutesInterface } from '../../interfaces/routes.interface';

@Component({
  selector: 'shared-sidebard',
  templateUrl: './sidebard.component.html'
})
export class SidebardComponent {
  public routes: RoutesInterface[] = [
    // {
    //   path: '',
    //   name: 'Home Page'
    // },
    // {
    //   path: 'about',
    //   name: 'About Page'
    // },
    // {
    //   path: 'contact',
    //   name: 'Contact Page'
    // },
    {
      path: 'countries/by-capital',
      name: 'Por capital'
    },
    {
      path: 'countries/by-country',
      name: 'Por país'
    },
    {
      path: 'countries/by-region',
      name: 'Por región'
    },

  ];
}
