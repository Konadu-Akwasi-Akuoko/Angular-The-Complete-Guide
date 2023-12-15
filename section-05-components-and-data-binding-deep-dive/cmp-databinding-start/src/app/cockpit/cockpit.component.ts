import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css',
})
export class CockpitComponent {
  @Output() onCreateServer = new EventEmitter<{
    server: string;
    name: string;
    content: string;
  }>();

  newServerName = '';
  newServerContent = '';

  onAddServer({ server }: { server: 'server' | 'blueprint' }) {
    this.onCreateServer.emit({
      server: server,
      name: this.newServerName,
      content: this.newServerContent,
    });
  }
}
