import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Series } from '@kakkoii/interfaces/series';

@Component({
  selector: 'kk-series-page-hero',
  templateUrl: './series-page-hero.component.html',
  styleUrls: [ './series-page-hero.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ],
  standalone: true,
})
export class SeriesPageHeroComponent {
  @Output() public readonly startWatchingBtn: EventEmitter<void> = new EventEmitter<void>();

  @Input() public series: Series

  public startWatchingButtonFn(): void {
    this.startWatchingBtn.emit()
  }
}
