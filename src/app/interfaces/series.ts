import { SeriesTags } from '@kakkoii/types/series-tags';
import { SeriesAgeRating } from '@kakkoii/types/series-age-rating';
import { SeriesType } from '@kakkoii/types/series-type';
import { SeriesStatus } from '@kakkoii/types/series-status';

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
  nsfw?: boolean;
  studio?: string;
  status: SeriesStatus;
  source: string;
}