import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObservableSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObservableSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable((subscriber) => {
      subscriber.next(3);
      subscriber.next(0);
      subscriber.next(1);
      subscriber.next(2);
      // subscriber.error('error');
      subscriber.complete();
    });

    customIntervalObservable.subscribe({
      next: (data) => {
        console.log(data);
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
