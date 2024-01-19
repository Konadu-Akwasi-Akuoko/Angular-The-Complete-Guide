import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterServiceService {
  constructor() {}

  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  onActiveToInactive() {
    this.activeToInactiveCounter++;
    console.log('Active to Inactive: ' + this.activeToInactiveCounter);
  }

  onInactiveToActive() {
    this.inactiveToActiveCounter++;
    console.log('Inactive to Active: ' + this.inactiveToActiveCounter);
  }
}
