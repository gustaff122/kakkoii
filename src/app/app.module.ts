import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@kakkoii/ui/organisms/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { cacheInterceptorProvider } from '@kakkoii/interceptors/cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarComponent,
  ],
  providers: [
    cacheInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
