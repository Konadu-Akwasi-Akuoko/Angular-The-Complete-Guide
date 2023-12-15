import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css',
})
export class CockpitComponent {
  @Output('serverCreated') onCreateServer = new EventEmitter<{
    server: string;
    name: string;
    content: string;
  }>();

  // newServerName = '';
  // newServerContent = '';

  onAddServer({
    server,
    serverName,
    serverContent,
  }: {
    server: 'server' | 'blueprint';
    serverName: HTMLInputElement;
    serverContent: HTMLInputElement;
  }) {
    console.log('severName: ', serverName);
    console.log('serverContent: ', serverContent);
    this.onCreateServer.emit({
      server: server,
      name: serverName.value,
      content: serverContent.value,
    });
  }
}
