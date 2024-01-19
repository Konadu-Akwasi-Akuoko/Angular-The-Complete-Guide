import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
})
export class InactiveUsersComponent {
  constructor(private userService: UserServiceService) {}
  // @Input() users: string[];
  // @Output() userSetToActive = new EventEmitter<number>();

  users = this.userService.inactiveUsers;

  onSetToActive(id: number) {
    this.userService.onSetToActive(id);
  }
}
