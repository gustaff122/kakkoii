import { SeriesType } from '@kakkoii/types/series-type';
import { SeriesStatus } from '@kakkoii/types/series-status';
import { SeriesTags } from '@kakkoii/types/series-tags';
import { Season } from '@kakkoii/types/season';

export interface SeriesListFilters {
  name: string;
  type: SeriesType;
  status: SeriesStatus;
  tags: SeriesTags[];
  season: Season;
  year: number;
}