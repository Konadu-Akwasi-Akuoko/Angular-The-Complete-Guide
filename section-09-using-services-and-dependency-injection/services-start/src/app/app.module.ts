import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccountComponent } from './account/account.component';
import { AccountsService } from './accounts.service';
import { AppComponent } from './app.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [AppComponent, AccountComponent, NewAccountComponent],
  imports: [BrowserModule, FormsModule],
  providers: [AccountsService, LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
