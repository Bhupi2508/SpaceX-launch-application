import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootRoutingModule } from './root/root-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RootRoutingModule,
    HttpClientModule, 
    BrowserAnimationsModule, 
    FlexLayoutServerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
