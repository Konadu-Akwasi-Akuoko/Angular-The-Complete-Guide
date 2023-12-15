import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

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

  @ViewChild('serverNameInput')
  serverName: ElementRef<HTMLInputElement>;

  // newServerName = '';
  // newServerContent = '';
  onAddServer({
    server,
    // serverName,
    serverContent,
  }: {
    server: 'server' | 'blueprint';
    // serverName: HTMLInputElement;
    serverContent: HTMLInputElement;
  }) {
    // console.log('severName: ', this.serverName.nativeElement.value);
    // console.log('serverContent: ', serverContent);
    this.onCreateServer.emit({
      server: server,
      name: this.serverName.nativeElement.value,
      content: serverContent.value,
    });
  }
}
