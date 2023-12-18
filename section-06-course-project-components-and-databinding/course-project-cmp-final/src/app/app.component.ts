import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeRoute: 'app-recipes' | 'app-shopping-list' = 'app-recipes';

  switchRoute(route: 'app-recipes' | 'app-shopping-list') {
    switch (route) {
      case 'app-recipes':
        this.activeRoute = 'app-recipes';
        break;
      case 'app-shopping-list':
        this.activeRoute = 'app-shopping-list';
        break;
      default:
        this.activeRoute = 'app-recipes';
        break;
    }
  }
}
