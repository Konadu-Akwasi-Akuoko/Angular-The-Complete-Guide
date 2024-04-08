import { Observable } from 'rxjs';

const cold$ = new Observable(subscriber => {
  subscriber.next(Math.random());
});

cold$.subscribe(value => console.log(`Subscriber 1: ${value}`));
cold$.subscribe(value => console.log(`Subscriber 2: ${value}`));

/**
 * Output:
 * Subscriber 1: 0.1419631721320307
 * Subscriber 2: 0.3762698451548453
 */