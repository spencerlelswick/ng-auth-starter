import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './auth/http.interceptor';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { OneComponent } from './one/one.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    AboutComponent,
    OneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
