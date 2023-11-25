import { Component } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrl: './server.component.css',
})
export class ServerComponent {
  async ngOnInit() {
    this.addToCounter();
  }
  serverId = 10;
  serverStatus = 'offline';
  counter = 0;

  getServerStatus() {
    return this.serverStatus;
  }

  async addToCounter() {
    let counterValue = 0;
    await new Promise((resolve) => {
      setTimeout(() => {
        counterValue = this.counter + 10;
        resolve(null);
      }, 1000);
    });

    this.counter = counterValue;
    return this.addToCounter();
  }
}
