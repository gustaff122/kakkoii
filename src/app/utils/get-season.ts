import { Season } from '@kakkoii/types/season';

export function getCurrentSeason(): { season: Season, year: number } {
  const month = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  const d = new Date();
  const monthName = month[d.getMonth()];
  const year = d.getFullYear();

  switch (monthName) {
    case 'January':
    case 'February':
      return { season: 'winter', year };

    case 'March':
    case 'April':
    case 'May':
      return { season: 'spring', year };

    case 'June':
    case 'July':
    case 'August':
      return { season: 'summer', year };

    case 'September':
    case 'October':
    case 'November':
      return { season: 'autumn', year };

    case 'December':
      return { season: 'winter', year: year + 1 };

    default:
      return { season: 'winter', year };
  }
}