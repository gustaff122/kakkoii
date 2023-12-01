import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Series } from '@kakkoii/interfaces/series';
import { HOME } from '@kakkoii/resolvers/home-resolver/home.key';
import { SeriesSliderMainComponent } from '@kakkoii/ui/organisms/series-slider-main/series-slider-main.component';

@Component({
  selector: 'kk-home-hero-desktop',
  templateUrl: './home-hero-desktop.component.html',
  styleUrls: [ './home-hero-desktop.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SeriesSliderMainComponent,
  ],
  standalone: true,
})
export class HomeHeroDesktopComponent {
  @Output() private readonly startWatchingBtn: EventEmitter<void> = new EventEmitter<void>();

  public readonly series: Series[] = this.activatedRoute.snapshot.data[HOME];
  public currentBgImage: string = this.series[2].banner;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public changeCurrentBgImage(imgUrl: string): void {
    this.currentBgImage = imgUrl;
  }

  public startWatchingButtonFn(): void {
    this.startWatchingBtn.emit();
  }
}
