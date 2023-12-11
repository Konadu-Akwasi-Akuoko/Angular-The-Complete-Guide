import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  serverId = 10;
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
