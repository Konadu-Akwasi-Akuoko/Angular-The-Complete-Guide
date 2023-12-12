import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  // styleUrls: ['./server.component.css'],
  styles: [
    `
      .online {
        color: white;
      }
    `,
    `
      h2 {
        color: brown;
      }
    `,
    `
      .offline {
        color: white;
      }
    `,
  ],
})
export class ServerComponent implements OnInit {
  @Input() serverId: string;

  serverStatus = 'offline';
  counter = 0;

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  ngOnInit() {
    this.addToCounter();
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    if (this.serverStatus === 'online') {
      return 'green';
    } else {
      return 'red';
    }
  }

  addToCounter() {
    setInterval(() => {
      this.counter += 10;
    }, 1000);
  }
}
