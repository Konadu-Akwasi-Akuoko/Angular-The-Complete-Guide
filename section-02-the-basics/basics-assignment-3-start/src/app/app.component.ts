import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showPass = false;
  timestamps: Date[] = [];

  addDate(date: Date) {
    this.timestamps.push(date);
    this.showPass = !this.showPass;
  }
}
