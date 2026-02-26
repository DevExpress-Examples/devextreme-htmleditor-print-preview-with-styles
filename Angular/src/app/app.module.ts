import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxHtmlEditorModule, DxPopupModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
      DxHtmlEditorModule, DxPopupModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
