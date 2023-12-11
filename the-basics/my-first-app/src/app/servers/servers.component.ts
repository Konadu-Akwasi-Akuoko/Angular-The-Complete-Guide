import { Component } from '@angular/core';

@Component({
  selector: '.app-servers',
  templateUrl: './servers.component.html',
  // template: `
  //   <div class="bg-success">
  //     <app-server />
  //     <div>Hello world</div>
  //     <app-server />
  //   </div>
  // `,
  styleUrl: './servers.component.css',
})
export class ServersComponent {
  isSeverAllowed = false;
  serverName = '';
  serverCreationStatus = 'No server was created!';
  serverCreated = false;
  servers = ['test_server_1', 'test_server_2'];

  constructor() {
    setTimeout(() => {
      this.isSeverAllowed = true;
    }, 2000);
  }

  onCreateServer() {
    this.serverCreationStatus =
      'Server was created and the name of the server is ' + this.serverName;
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  // onInputServerNameChange(event: Event) {
  //   this.serverName = (<HTMLInputElement>event.target).value;
  // }
}
