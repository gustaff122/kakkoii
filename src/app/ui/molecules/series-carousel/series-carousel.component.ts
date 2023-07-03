import { AfterViewInit, ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Input, Self } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Series } from '@kakkoii/interfaces/series';
import { RouterLink } from '@angular/router';
import { SwiperProvider } from '@kakkoii/providers/swiper.provider';
import { generateId } from '@kakkoii/utils/generate-id';

@Component({
  selector: 'kk-series-carousel',
  templateUrl: './series-carousel.component.html',
  styleUrls: [ './series-carousel.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SwiperProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterLink,
  ],
  standalone: true,
})
export class SeriesCarouselComponent implements AfterViewInit {
  @Input() series: Series[];
  @Input() sectionTitle: string;

  public readonly id = generateId();

  constructor(
    @Self() private readonly swiperProvider: SwiperProvider,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
  }

  public ngAfterViewInit(): void {
    const swiper: any = this.document.querySelector(`#${this.id}-swiper`);

    if (swiper) {
      this.swiperProvider.withPagination(swiper, {
        slideToClickedSlide: true,
        breakpoints: {
          0: {
            slidesPerView: 2.5,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 40
          },
          1536: {
            slidesPerView: 7,
            spaceBetween: 40
          }
        }
      });
    }
  }
}
