import { Pipe, PipeTransform } from '@angular/core';
import { Season } from '@kakkoii/types/season';

@Pipe({
  name: 'season',
  standalone: true,
})

export class SeasonPipe implements PipeTransform {

  public transform(season: Season): string {
    switch (season) {
      case 'spring': {
        return 'wiosna';
      }
      case 'summer': {
        return 'lato';
      }
      case 'autumn': {
        return 'jesień';
      }
      case 'winter': {
        return 'zima';
      }
    }
  }
}