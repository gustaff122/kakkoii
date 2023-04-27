import { SeriesRelationType } from '@kakkoii/types/series-relation-type';

export interface SeriesRelations {
  relation: SeriesRelationType;
  relatedId: string;
  titleJpRom: string;
  titleEn: string;
  thumbnailUrl: string;
  imageUrl: string;
}