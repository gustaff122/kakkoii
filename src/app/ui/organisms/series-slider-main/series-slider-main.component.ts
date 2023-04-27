import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Series } from '@kakkoii/interfaces/series';
import { SwiperProvider } from '@kakkoii/providers/swiper.provider';
import { SeriesSliderMainDesktopComponent } from './series-slider-desktop/series-slider-main-desktop.component';
import { SeriesSliderMainMobileComponent } from './series-slider-main-mobile/series-slider-main-mobile.component';
import { IsBreakpointDirective } from '@kakkoii/directives/is-breakpoint.directive';

@Component({
  selector: 'kk-series-slider-main',
  templateUrl: './series-slider-main.component.html',
  styleUrls: [ './series-slider-main.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SwiperProvider
  ],
  imports: [
    CommonModule,
    SeriesSliderMainDesktopComponent,
    SeriesSliderMainMobileComponent,
    IsBreakpointDirective,
  ],
  standalone: true,
})
export class SeriesSliderMainComponent {

  @Output() public readonly imageChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() series: Series[];

  public imageChangeHandler(img: string): void {
    this.imageChange.emit(img)
  }
}
