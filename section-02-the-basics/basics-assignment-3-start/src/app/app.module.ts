import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ComponentParagraphComponent } from './components/component-paragraph/component-paragraph.component';
import { ComponentButtonComponent } from './components/component-button/component-button.component';
import { ComponentTimestampComponent } from './components/component-timestamp/component-timestamp.component';

@NgModule({
  declarations: [AppComponent, ComponentParagraphComponent, ComponentButtonComponent, ComponentTimestampComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
