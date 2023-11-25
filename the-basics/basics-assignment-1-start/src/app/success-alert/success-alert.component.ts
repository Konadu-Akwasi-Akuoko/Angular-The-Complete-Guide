import { Component } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  template: `
    <div>
      <p class="alert alert-success">
        This is a success alert! It means the operation was successful.
      </p>
    </div>
  `,
  styleUrl: './success-alert.component.css',
})
export class SuccessAlertComponent {}
