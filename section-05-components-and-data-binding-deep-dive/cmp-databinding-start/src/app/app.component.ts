import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements = [
    { type: 'server', name: 'Testserver', content: 'Just a test!' },
  ];
  
  onCreateServer({
    server,
    name,
    content,
  }: {
    server: string;
    name: string;
    content: string;
  }) {
    this.serverElements.push({
      type: server,
      name: name,
      content: content,
    });
  }
}
