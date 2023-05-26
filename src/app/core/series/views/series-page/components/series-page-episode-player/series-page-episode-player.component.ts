import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesPageEpisodePlayerComponentStore } from './series-page-episode-player.component.store';
import { firstValueFrom, Observable } from 'rxjs';
import { NgIconComponent } from '@ng-icons/core';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '@kakkoii/utils/loading-spinner/loading-spinner.component';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { PlayerUrlPipe } from '@kakkoii/pipes/player-url.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { SeriesFilteredLinks } from '@kakkoii/interfaces/series-filtered-links';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SeriesLink } from '@kakkoii/interfaces/series-link';
import { NgScrollbarModule } from 'ngx-scrollbar';

interface SelectedTranslatorForm {
  selectedTranslator: FormControl<number>;
  linkUrl: FormControl<string>;
}

@Component({
  selector: 'kk-series-page-episode-player',
  templateUrl: './series-page-episode-player.component.html',
  styleUrls: [ './series-page-episode-player.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SeriesPageEpisodePlayerComponentStore
  ],
  imports: [
    CommonModule,
    NgIconComponent,
    LoadingSpinnerComponent,
    PlayerUrlPipe,
    RouterLink,
    NgSelectModule,
    ReactiveFormsModule,
    NgScrollbarModule,
  ],
  standalone: true,
})
export class SeriesPageEpisodePlayerComponent implements OnInit {
  public readonly epNumber: string = this.activatedRoute.snapshot.params['epNumber'];
  public readonly titleEn: string = this.activatedRoute.snapshot.data[SERIES].titleEn;

  public form: FormGroup<SelectedTranslatorForm>;

  public readonly loading$: Observable<boolean> = this.seriesPageEpisodesListComponentStore.loading$;
  public readonly episode$: Observable<SeriesEpisode> = this.seriesPageEpisodesListComponentStore.episode$;
  public readonly links$: Observable<SeriesFilteredLinks[]> = this.seriesPageEpisodesListComponentStore.links$;
  public readonly hasLinks$: Observable<boolean> = this.seriesPageEpisodesListComponentStore.hasLinks$;
  public readonly linksMirrors$: Observable<SeriesLink[]> = this.seriesPageEpisodesListComponentStore.linksMirrors$;
  public readonly episodesCount$: Observable<number | null> = this.seriesPageEpisodesListComponentStore.episodesCount$;

  constructor(
    @Self() private readonly seriesPageEpisodesListComponentStore: SeriesPageEpisodePlayerComponentStore,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.seriesPageEpisodesListComponentStore.getEpisode({ epNumber: parseInt(this.epNumber), callbackFn: () => {
        this.buildForm();
      } });
  }

  public changeTranslatorHandler(): void {
    const selectedTranslator = this.form.get('selectedTranslator').value;

    this.seriesPageEpisodesListComponentStore.selectTranslator({ selectedTranslator })
    firstValueFrom(this.linksMirrors$).then((links) => {
      this.form.patchValue({ linkUrl: links[0].url })
    })
  }

  private buildForm(): void {
    firstValueFrom(this.linksMirrors$).then((links) => {
      this.form = this.formBuilder.group<SelectedTranslatorForm>({
        selectedTranslator: new FormControl(0),
        linkUrl: new FormControl(links ? links[0].url : null)
      });
    })
  }
}