import { SeriesRelationType } from '@kakkoii/types/series-relation-type';

export interface SeriesRelation {
  relation: SeriesRelationType;
  relatedId: string;
}