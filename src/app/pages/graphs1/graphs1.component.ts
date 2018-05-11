import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs1',
  templateUrl: './graphs1.component.html',
  styles: []
})
export class Graphs1Component implements OnInit {

  public graphs: any = {
    'graph1': {
      'labels': ['E-Commerce', 'Store', 'Ebay'],
      'data': [35, 40, 25],
      'type': 'doughnut',
      'title': '2018 Sells'
    },
    'graph2': {
      'labels': ['Men', 'Women'],
      'data': [4500, 6000],
      'type': 'doughnut',
      'title': 'Costumers'
    },
    'graph3': {
      'labels': ['Laptops', 'Tablets', 'Chargers', 'Projectors', 'Monitors'],
      'data': [455, 268, 89, 25, 312],
      'type': 'doughnut',
      'title': 'Equipment acquisition'
    },
    'graph4': {
      'labels': ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'Dicember'],
      'data': [15, 11, 13, 6, 2, 16, 20, 19, 8, 7, 3, 22],
      'type': 'doughnut',
      'title': 'Employees holidays'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
