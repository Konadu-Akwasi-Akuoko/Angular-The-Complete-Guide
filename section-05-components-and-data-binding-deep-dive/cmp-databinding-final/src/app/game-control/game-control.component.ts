import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css',
})
export class GameControlComponent {
  @Output() onIntervalFired = new EventEmitter<number>();
  number = 0;
  interval;

  onStartClicked() {
    this.interval = setInterval(() => {
      this.onIntervalFired.emit((this.number += 1));
    }, 1000);
    this.interval;
  }

  onStopClicked() {
    clearInterval(this.interval);
  }
}
