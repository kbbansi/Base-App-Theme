import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


@Injectable()
export class MenuItems {
  selection;
  simpleObservable = new Observable((observer) => {
    switch (this.selection) {
      case 'admin':
        observer.next([
          {
            name: 'Dashboard',
            url: '/admin/dashboard',
            icon: 'icon-speedometer'
          },
          {
            name: 'Add user',
            url: '/admin/user',
            icon: 'icon-user'
          },
          {
            name: 'Course Providers',
            url: '/admin/course-providers',
            icon: 'icon-star'
          },
          {
            name: 'Travel Agents',
            url: '/admin/travel-agents',
            icon: 'icon-star'
          },
          {
            name: 'Exchange Rates',
            url: '/admin/exchange-rates',
            icon: 'icon-star'
          },
          {
            name: 'Employees',
            url: '/admin/employees',
            icon: 'icon-star'
          }
        ]);
        break;

      case 'officer':
        observer.next([
          {
            name: 'Dashboard',
            url: '/officer/dashboard',
            icon: 'icon-speedometer'
          },
          // {
          //   name: 'Dashboard',
          //   url: '/admin/setup',
          //   icon: 'icon-speedometer'
          // },
        ]);
        break;
    }
    observer.complete()
  });
  constructor(private ath: AuthService) {
    this.ath.getType().subscribe(response => {
      console.log(response);
      this.selection = response;
    })
  }

  menu(menuList) {
    this.selection = menuList;
    return this.simpleObservable
  }
}
