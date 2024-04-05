import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObservableSubscription: Subscription;

  private customObs = new Observable<number>();

  constructor() {
  }

  private observer;

  ngOnInit() {
    // this.firstObservableSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable((subscriber) => {
      let count = 0;
      setInterval(() => {
        subscriber.next(count);
        count++;
        if (count === 11) {
          subscriber.complete();
        }
      }, 1000);
    });

    customIntervalObservable.subscribe({
      next: (data) => {
        this.observer = data;
        console.log(this.observer);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  ngOnDestroy() {
    this.firstObservableSubscription.unsubscribe();
  }
}
