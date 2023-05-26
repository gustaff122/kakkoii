import { SeriesRelationType } from '@kakkoii/types/series-relation-type';
import { Series } from './series';

export interface SeriesRelation {
  relation: SeriesRelationType;
  relatedId: string;
  relatedSeries: Pick<Series, 'imageUrl' | 'thumbnailUrl' | 'titleEn' | 'titleJpRom' | 'pseudo' | '_id'>
}