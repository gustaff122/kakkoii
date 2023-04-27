import { SeriesLink } from './series-link';

export interface SeriesEpisode {
  number: number;
  titleEn?: string;
  titleJp?: string;
  titleJpRom?: string;
  synopsis?: string;
  aired?: string;
  duration?: number;
  links?: SeriesLink[];
}