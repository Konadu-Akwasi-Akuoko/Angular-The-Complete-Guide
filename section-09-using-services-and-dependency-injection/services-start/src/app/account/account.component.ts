import { Component, Input } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{
  //   id: number;
  //   newStatus: string;
  // }>();

  constructor(
    // private loggingService: LoggingService,
    private accountsService: AccountsService
  ) {}

  onSetTo(status: string) {
    // this.statusChanged.emit({ id: this.id, newStatus: status });
    // console.log(
    //   'A server status changed, server id:' +
    //     this.id +
    //     ', new status: ' +
    //     status
    // );
    // this.loggingService.logStatusChange(this.id, status);
    this.accountsService.updateStatus(this.id, status);
    this.accountsService.statusUpdated.emit(status);
  }
}
