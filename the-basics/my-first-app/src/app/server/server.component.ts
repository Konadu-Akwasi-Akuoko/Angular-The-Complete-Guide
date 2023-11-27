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

  ngOnInit() {
    this.addToCounter();
  }

  getServerStatus() {
    return this.serverStatus;
  }

  addToCounter() {
    setInterval(() => {
      this.counter += 10;
    }, 1000);
  }
}
