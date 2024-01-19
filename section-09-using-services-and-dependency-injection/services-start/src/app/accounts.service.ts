import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private loggingService: LoggingService) {}

  statusUpdated = new EventEmitter<string>();

  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Testaccount',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.onCreateAccount(name, status);
  }

  updateStatus(id: number, newStatus: string) {
    console.log('updateStatus');
    this.accounts[id].status = newStatus;
    this.loggingService.logStatusChange(id, newStatus);
  }
}
