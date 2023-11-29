import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username = '';
  buttonDisabled = true;

  onResetButtonClicked() {
    this.username = '';
    this.buttonDisabled = true;
  }

  onUsernameInputChanged(event: Event) {
    if ((<HTMLInputElement>event.target).value) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }
}
