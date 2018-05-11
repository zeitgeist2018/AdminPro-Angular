import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() percent: number = 50;
  @Input() legend: string = 'Legend';

  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange(value: number) {
    const htmlElement: any = this.txtProgress.nativeElement;
    if (value >= 100) {
      this.percent = 100;
    } else if (value <= 0) {
      this.percent = 0;
    } else {
      this.percent = value;
    }
    htmlElement.value = this.percent;
    this.valueChange.emit(this.percent);
  }

  increment(value: number) {
    if (this.percent >= 100 && value > 0) {
      this.percent = 100;
    } else if (this.percent <= 0 && value < 0) {
      this.percent = 0;
    } else {
      this.percent = this.percent + value;
      this.valueChange.emit(this.percent);
      this.txtProgress.nativeElement.focus();
    }
  }

}
