import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@kakkoii/ui/organisms/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FooterComponent } from '@kakkoii/ui/organisms/footer/footer.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import {
  matExpandMore,
  matHome,
  matSearch,
  matWifiOff,
  matArrowDropUp,
  matArrowDropDown,
  matTune,
  matPlayArrow,
  matNavigateNext,
  matNavigateBefore,
  matClose,
  matVisibility,
  matVisibilityOff,
  matErrorOutline,
} from '@ng-icons/material-icons/baseline';
import { matInfoOutline, matSavingsOutline } from '@ng-icons/material-icons/outline';
import { bootstrapTwitter, bootstrapDiscord, bootstrapFacebook, bootstrapXCircle } from '@ng-icons/bootstrap-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from 'ngx-progressbar';
import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog';
import { ErrorInterceptor } from '@kakkoii/interceptors/error.interceptor';
import { SnackbarComponent } from '@kakkoii/ui/molecules/snackbar/snackbar.component';

const components = [
  NavbarComponent,
  FooterComponent,
  NgIconsModule,
  NgProgressModule.withConfig({
    spinner: false,
    color: '#3b5eda',
    speed: 300,
    trickleSpeed: 900,
  }),
];

const icons = [ provideIcons({
  matExpandMore,
  matHome,
  matSearch,
  matInfoOutline,
  matSavingsOutline,
  bootstrapTwitter,
  bootstrapDiscord,
  bootstrapXCircle,
  bootstrapFacebook,
  matWifiOff,
  matArrowDropUp,
  matArrowDropDown,
  matPlayArrow,
  matTune,
  matNavigateNext,
  matNavigateBefore,
  matClose,
  matVisibility,
  matVisibilityOff,
  matErrorOutline,
}),
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    ...components,
    SnackbarComponent,
  ],
  providers: [
    ...icons,
    {
      provide: DEFAULT_DIALOG_CONFIG, useValue: { panelClass: 'modal' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },

  ],
  bootstrap: [ AppComponent ],
})

export class AppModule {
}
