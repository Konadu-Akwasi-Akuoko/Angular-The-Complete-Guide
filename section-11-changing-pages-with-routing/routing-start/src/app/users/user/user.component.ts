import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute) {}

  user: { id: number; name: string } = { id: 0, name: '' };
  private paramSubscription: Subscription;

  ngOnInit() {
    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user.name = this.route.snapshot.paramMap.get('name');

    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = Number(params['id']);
      this.user.name = params['name'];
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
