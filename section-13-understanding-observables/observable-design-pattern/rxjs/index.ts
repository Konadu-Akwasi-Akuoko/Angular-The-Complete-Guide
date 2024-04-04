import { Observable, of } from "rxjs";

const numbersObservable$: Observable<number> = of(1, 2, 3, 4, 5);

const observer = numbersObservable$.subscribe((number) => {
  console.log(number);
});

of(10, 20, 30, "hello").subscribe({
  next: (value) => console.log("next:", value),
  error: (err) => console.log("error:", err),
  complete: () => console.log("the end"),
}).unsubscribe();

observer.unsubscribe()
