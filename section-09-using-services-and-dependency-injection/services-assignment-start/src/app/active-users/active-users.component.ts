import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent {
  constructor(private userService: UserServiceService) {}
  // @Input() users: string[];
  // @Output() userSetToInactive = new EventEmitter<number>();

  users = this.userService.activeUsers;

  onSetToInactive(id: number) {
    this.userService.onSetToInactive(id);
  }
}
