import { AfterViewInit, ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Inject, Input, Output, Self } from '@angular/core';
import { CommonModule, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Series } from '@kakkoii/interfaces/series';
import { SwiperProvider } from '@kakkoii/providers/swiper.provider';
import { generateId } from '@kakkoii/utils/generate-id';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'kk-series-slider-main-desktop',
  templateUrl: './series-slider-main-desktop.component.html',
  styleUrls: [ './series-slider-main-desktop.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SwiperProvider,
  ],
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    NgIconComponent,
  ],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SeriesSliderMainDesktopComponent implements AfterViewInit {

  @Output() public readonly imageChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() series: Series[];

  public readonly id = generateId();

  constructor(
    @Self() private readonly swiperProvider: SwiperProvider,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
  }

  public ngAfterViewInit(): void {
    const swiper: any = this.document.querySelector(`#${this.id}-swiper`);

    if (swiper) {
      this.swiperProvider.basic(swiper, {
        centeredSlides: true,
        slideToClickedSlide: true,
        slideActiveClass: 'active-slide',
        breakpoints: {
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3.5,
          },
          1280: {
            slidesPerView: 4,
          },
          1536: {
            slidesPerView: 4.5,
          },
          2140: {
            slidesPerView: 4.5,
          },
        },
      });

      swiper.swiper.slideNext();
      swiper.swiper.slideNext();

      swiper.addEventListener('slidechange', () => {
        const img: any = this.document.querySelector(`#${this.id}-swiper-img-${swiper.swiper.activeIndex}`);
        this.imageChange.emit(img.src);
      });
    }
  }
}
