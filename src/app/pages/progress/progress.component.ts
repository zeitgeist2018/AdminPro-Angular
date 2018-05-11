import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  percent: number = 20;
  percent2: number = 30;

  constructor() { }

  ngOnInit() {
  }

}
