import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[kkImgFallback]',
  standalone: true,
})
export class ImgFallbackDirective {
  @Input() kkImgFallback: string = '';

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer2: Renderer2,
  ) {
  }

  @HostListener('error')
  public loadFallbackOnError(): void {
    this.renderer2.setAttribute(this.elementRef.nativeElement, 'src', this.kkImgFallback);
  };

  @HostListener('loading')
  public loadFallbackOnLoading(): void {
    this.renderer2.setAttribute(this.elementRef.nativeElement, 'src', this.kkImgFallback);
  };
}