import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsBreakpointDirective } from '@kakkoii/directives/is-breakpoint.directive';
import { HomeHeroDesktopComponent } from './components/home-hero-desktop/home-hero-desktop.component';
import { HomeHeroMobileComponent } from './components/home-hero-mobile/home-hero-mobile.component';


@Component({
  selector: 'kk-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: [ './home-hero.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IsBreakpointDirective,
    HomeHeroDesktopComponent,
    HomeHeroMobileComponent,
  ],
  standalone: true,
})
export class HomeHeroComponent {
}
