import { Injectable } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Injectable()
export class SwiperProvider {

  private swiper: any;

  public get instance(): any {
    return this.swiper;
  }

  public basic(swiper: any, options: SwiperOptions): void {
    this.swiper = swiper;

    this.build({
      injectStyles: [
        `
        swiper-slide {
          transition-property: transform !important;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
          transition-duration: 150ms !important;
        }
      `,
      ],
      ...options,
    });
  }

  public withPagination(swiper: any, options: SwiperOptions): void {
    this.swiper = swiper;

    this.build({
      injectStyles: [
        `
          swiper-slide {
            transition-property: transform !important;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
            transition-duration: 150ms !important;
          }

          div.swiper-wrapper {
            padding-bottom: 1rem;
          }
          span.swiper-pagination-bullet {
            width: 1.5rem;
            border-radius: 5px;
          }

          span.swiper-pagination-bullet:not(.swiper-pagination-bullet-active) {
            position: relative;
            opacity: 1;
            height: 0.2rem;
            bottom: -14px;
          }

          span.swiper-pagination-bullet:not(.swiper-pagination-bullet-active) {
            background: var(--almost-white);
          }

          span.swiper-pagination-bullet.swiper-pagination-bullet-active {
            background: var(--royal-blue);
          }

          span.swiper-pagination-bullet.swiper-pagination-bullet-active {
            position: relative;
            opacity: 1;
            height: 0.2rem;
            bottom: -14px;
          }
          `,
      ],
      ...options,
    });
  }

  private build(options: SwiperOptions): void {
    if (this.swiper) {
      Object.assign(this.swiper, {
        observer: true,
        resizeObserver: true,
        updateOnWindowResize: true,
        ...options,
      });

      this.swiper.initialize();
    }
  }
}