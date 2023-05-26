import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Series } from '@kakkoii/interfaces/series';
import { HOME } from '@kakkoii/resolvers/home-resolver/home.key';
import { SeriesSliderMainComponent } from '@kakkoii/ui/organisms/series-slider-main/series-slider-main.component';

@Component({
  selector: 'kk-home-hero-mobile',
  templateUrl: './home-hero-mobile.component.html',
  styleUrls: [ './home-hero-mobile.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SeriesSliderMainComponent,
  ],
  standalone: true,
})
export class HomeHeroMobileComponent {
  @Output() public readonly startWatchingBtn: EventEmitter<void> = new EventEmitter<void>();

  public readonly series: Series[] = this.activatedRoute.snapshot.data[HOME];
  public currentBgImage = this.series[2].imageUrl

  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public changeCurrentBgImage(imgUrl: string): void {
    this.currentBgImage = imgUrl
  }

  public startWatchingButtonFn(): void {
    this.startWatchingBtn.emit()
  }
}
