import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, interval, map, Observable, Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  // private firstObservableSubscription: Subscription;

  // private customObs = new Observable<number>();

  constructor() {}

  private observer;

  ngOnInit() {
    // this.firstObservableSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    // const customIntervalObservable = new Observable((subscriber) => {
    //   let count = 0;
    //   setInterval(() => {
    //     subscriber.next(count);
    //     count++;
    //     if (count === 10) {
    //       subscriber.error(new Error("Count is greater than 10"));
    //     }
    //     if (count === 11) {
    //       subscriber.complete();
    //     }
    //   }, 1000);
    // });
    // customIntervalObservable
    //   .pipe(
    //     filter((data) => {
    //       if ((data as number) % 2 == 0) {
    //         return true;
    //       }
    //       return false;
    //     })
    //   )
    //   .pipe(map((data) => "Round " + data))
    //   .subscribe({
    //     next: (data) => {
    //       this.observer = data;
    //       console.log(this.observer);
    //     },
    //     error: (error) => {
    //       console.log(error);
    //       alert(error.message);
    //     },
    //     complete: () => {
    //       console.log("completed");
    //     },
    //   });
    // customIntervalObservable
    //   .pipe(map((data) => "ROUND " + data))
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }

  ngOnDestroy() {
    // this.firstObservableSubscription.unsubscribe();
  }
}
