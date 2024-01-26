import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.route.params.subscribe((params) => {
      this.server = this.serversService.getServer(Number(params['id']));
    });
    // this.server = this.serversService.getServer(1);
  }
}
