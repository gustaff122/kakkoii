import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsBreakpointDirective } from '@kakkoii/directives/is-breakpoint.directive';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { SeriesCurrentSeasonCarouselComponent } from '@kakkoii/ui/organisms/series-current-season-carousel/series-current-season-carousel.component';

@Component({
  selector: 'kk-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IsBreakpointDirective,
    HomeHeroComponent,
    SeriesCurrentSeasonCarouselComponent,
  ],
  standalone: true,
})
export class HomeComponent {
  public scrollTo(el: HTMLElement): void {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
