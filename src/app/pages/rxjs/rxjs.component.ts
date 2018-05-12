import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() {
    this.subscription = this.getCounter()
      .subscribe(value => {
        console.log(value);
      }, err => {
        console.log(err);
      }, () => {
        console.log('Observable stopped');
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('Unsubscribing Observable');
  }

  getCounter(): Observable<any> {
    return new Observable(observer => {
      let counter = 0;
      const interval = setInterval(() => {
        counter += 1;
        const out = { value: counter };
        observer.next(out);
        // if (counter === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }
        // if (counter === 2) {
        //   observer.error('An error happened, counter == 2');
        // }
      }, 500);
    }).pipe(
      retry(3),
      map((res: any) => {
        return res.value;
      }),
      filter((value, index) => {
        return value % 2 === 0;
      }));
  }

}
