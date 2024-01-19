import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  onCreateAccount(accountName: string, accountStatus: string) {
    console.log(
      'A new server was created, server name:' +
        accountName +
        ', new status: ' +
        accountStatus
    );
  }

  logStatusChange(id: number, status: string) {
    console.log(
      'A server status changed, server id:' + id + ', new status: ' + status
    );
  }
}
