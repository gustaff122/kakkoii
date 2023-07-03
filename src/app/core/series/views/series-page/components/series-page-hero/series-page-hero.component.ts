import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Series } from '@kakkoii/interfaces/series';
import { SeasonPipe } from '@kakkoii/pipes/season.pipe';
import { TagsPipe } from '@kakkoii/pipes/tags.pipe';

@Component({
  selector: 'kk-series-page-hero',
  templateUrl: './series-page-hero.component.html',
  styleUrls: [ './series-page-hero.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SeasonPipe,
    TagsPipe,
  ],
  standalone: true,
})
export class SeriesPageHeroComponent {
  @Output() public readonly startWatchingBtn: EventEmitter<void> = new EventEmitter<void>();

  @Input() public series: Series;

  public startWatchingButtonFn(): void {
    this.startWatchingBtn.emit();
  }
}
