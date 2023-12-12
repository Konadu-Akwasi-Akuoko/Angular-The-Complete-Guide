import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-timestamp',
  templateUrl: './component-timestamp.component.html',
  styleUrl: './component-timestamp.component.css',
  styles: [
    `
      .color {
        color: white;
      }
    `,
  ],
})
export class ComponentTimestampComponent {
  @Input() timestamp: Date[];
}
