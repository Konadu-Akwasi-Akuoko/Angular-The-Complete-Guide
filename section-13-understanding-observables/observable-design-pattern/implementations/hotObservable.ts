import { Subject } from 'rxjs';

const hot$ = new Subject();

hot$.subscribe(value => console.log(`Subscriber 1: ${value}`));
hot$.subscribe(value => console.log(`Subscriber 2: ${value}`));

hot$.next(Math.random());

/**
 * Output:
 * Subscriber 1: 0.3877064098668468
 * Subscriber 2: 0.3877064098668468
 */