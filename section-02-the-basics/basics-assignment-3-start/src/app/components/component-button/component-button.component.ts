import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-component-button',
  templateUrl: './component-button.component.html',
  styleUrl: './component-button.component.css',
})
export class ComponentButtonComponent {
  @Output() dateToParent = new EventEmitter<Date>();

  onButtonClick() {
    this.dateToParent.emit(new Date());
  }
}
