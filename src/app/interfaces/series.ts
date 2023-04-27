import { SeriesTags } from '@kakkoii/types/series-tags';
import { SeriesAgeRating } from '@kakkoii/types/series-age-rating';
import { SeriesType } from '@kakkoii/types/series-type';
import { SeriesEpisode } from './series-episode';
import { SeriesStatus } from '@kakkoii/types/series-status';
import { SeriesRelations } from './series-relations';

export interface Series {
  _id: string;
  pseudo: string;
  titleEn: string;
  titleJpRom: string;
  titleJp: string;
  titlesAlt?: string[];
  startDate?: string;
  endDate?: string;
  synopsis: string;
  tags: SeriesTags[];
  thumbnailUrl?: string;
  imageUrl?: string;
  trailerUrl?: string;
  ageRating: SeriesAgeRating;
  type: SeriesType;
  episodeDuration?: number;
  episodesCount?: number;
  episodes: SeriesEpisode[];
  nsfw?: boolean;
  studio?: string;
  status: SeriesStatus;
  source: string;
  relations: SeriesRelations[]
}