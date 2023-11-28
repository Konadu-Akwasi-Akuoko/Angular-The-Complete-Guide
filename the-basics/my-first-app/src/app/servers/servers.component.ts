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
  name = 'Akuoko Konadu Akwasi';
  serverCreationStatus = 'No server was created!';

  constructor() {
    setTimeout(() => {
      this.isSeverAllowed = true;
    }, 2000);
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created';
  }
}
