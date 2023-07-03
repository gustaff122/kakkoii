import { Pipe, PipeTransform } from '@angular/core';
import { SeriesTags } from '@kakkoii/types/series-tags';

@Pipe({
  name: 'tags',
  standalone: true,
})

export class TagsPipe implements PipeTransform {

  public transform(tag: SeriesTags): string {
    switch (tag) {
      default: {
        return tag;
      }
      case 'Zagadki/Tajemnice': {
        return 'Tajemnica';
      }
      case 'Okruchy Życia': {
        return 'Okruchy';
      }
    }
  }
}