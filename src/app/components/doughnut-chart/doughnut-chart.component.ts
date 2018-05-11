import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {

  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() type: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
