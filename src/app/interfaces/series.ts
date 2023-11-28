import { SeriesType } from '@kakkoii/types/series-type';
import { Season } from '@kakkoii/types/season';
import { SeriesStatus } from '@kakkoii/types/series-status';
import { SeriesTags } from '@kakkoii/types/series-tags';

export interface Series {
  id: string;
  nsfw: boolean;
  animetype: SeriesType;
  title: string;
  subtitles: string[];
  description: string;
  poster: string;
  banner: string;
  status: SeriesStatus;
  seasontype: Season;
  seasonyear: number;
  tags: SeriesTags[];
  externallinktype: string;
  externallinkvalue: string;
  rating: number;
  pseudolink: string;
  epcount: number;
  studio: string;
}