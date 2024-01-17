import { Component } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService],
})
export class AppComponent {
  constructor(private account: AccountsService) {}

  accounts = this.account.accounts;

  // onAccountAdded(newAccount: { name: string; status: string }) {
  //   this.account.addAccount(newAccount.name, newAccount.status);
  // }

  // onStatusChanged(updateInfo: { id: number; newStatus: string }) {
  //   this.account.updateStatus(updateInfo.id, updateInfo.newStatus);
  // }
}
