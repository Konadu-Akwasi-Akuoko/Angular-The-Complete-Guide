import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.id = 0;
  }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params: Params) => {
        this.id = +params.id;
      },
      complete: () => {
        console.log('completed');
      },
      error: () => {
        console.log('error');
      },
    });
  }
}
