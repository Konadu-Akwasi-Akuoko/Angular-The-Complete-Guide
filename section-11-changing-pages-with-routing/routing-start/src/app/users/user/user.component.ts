import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: { id: number; name: string } = { id: 0, name: '' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user.name = this.route.snapshot.paramMap.get('name');
  }
}
