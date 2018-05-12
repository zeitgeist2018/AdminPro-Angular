import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    const promise = this.countToThree();
    promise.then(() => {
      console.log('resolved');
    }).catch(error => {
      console.log('Error: ' + error);
    });
  }

  ngOnInit() {
  }

  countToThree(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter += 1;
        if (counter === 3) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);
    });
    return promise;
  }

}
