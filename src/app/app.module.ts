import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@kakkoii/ui/organisms/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FooterComponent } from '@kakkoii/ui/organisms/footer/footer.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { matExpandMore, matHome, matSearch, matWifiOff, matArrowDropUp, matArrowDropDown } from  '@ng-icons/material-icons/baseline'
import { matInfoOutline, matSavingsOutline } from  '@ng-icons/material-icons/outline'
import { bootstrapTwitter, bootstrapDiscord, bootstrapFacebook } from  '@ng-icons/bootstrap-icons'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarComponent,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    FooterComponent,
    NgIconsModule,
  ],
  providers: [
    provideIcons({  matExpandMore, matHome, matSearch, matInfoOutline, matSavingsOutline, bootstrapTwitter, bootstrapDiscord, bootstrapFacebook, matWifiOff, matArrowDropUp, matArrowDropDown })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
