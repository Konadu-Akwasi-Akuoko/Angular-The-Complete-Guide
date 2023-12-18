import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() onSwitchRoute = new EventEmitter<
    'app-recipes' | 'app-shopping-list'
  >();

  @Input() activeHeaderComponent: 'app-recipes' | 'app-shopping-list';

  onRouteClicked(route: 'app-recipes' | 'app-shopping-list') {
    if (route === 'app-recipes') {
      this.onSwitchRoute.emit('app-recipes');
    } else {
      this.onSwitchRoute.emit('app-shopping-list');
    }
  }
}
