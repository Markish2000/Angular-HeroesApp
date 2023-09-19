// Angular
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Libraries
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';

// Shared
import { SharedModule } from './shared/shared.module';

// Routing
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Modules
    SharedModule,

    // Libraries
    BrowserAnimationsModule,
    BrowserModule,

    // Routes
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
