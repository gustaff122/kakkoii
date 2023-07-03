import { SeriesType } from '@kakkoii/types/series-type';
import { Season } from '@kakkoii/types/season';
import { SeriesStatus } from '@kakkoii/types/series-status';
import { SeriesTags } from '@kakkoii/types/series-tags';

export interface Series {
  anime_id: number;
  nsfw: boolean;
  anime_type: SeriesType;
  title: string;
  subtitles: string[];
  description: string;
  poster: string;
  banner: string;
  status: SeriesStatus;
  season_type: Season;
  season_year: number;
  tags: SeriesTags[];
  external_link_type: string;
  external_link_value: string;
  rating: number;
  pseudo_link: string;
  ep_count: number;
  studio: string;
}