import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenus: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Progress bar', url: '/progress' },
        { title: 'Charts', url: '/graphs1' },
        { title: 'Promises', url: '/promises' },
        { title: 'RxJs', url: '/rxjs' }
      ]
    }
  ];

  constructor() { }

}
