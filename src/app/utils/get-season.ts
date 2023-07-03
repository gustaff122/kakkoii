import { Season } from '@kakkoii/types/season';

export function getCurrentSeason(): { season_type: Season, season_year: number } {
  const month = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  const d = new Date();
  const monthName = month[d.getMonth()];
  const season_year = d.getFullYear();

  switch (monthName) {
    case 'January':
    case 'February':
      return { season_type: 'winter', season_year };

    case 'March':
    case 'April':
    case 'May':
      return { season_type: 'spring', season_year };

    case 'June':
    case 'July':
    case 'August':
      return { season_type: 'summer', season_year };

    case 'September':
    case 'October':
    case 'November':
      return { season_type: 'autumn', season_year };

    case 'December':
      return { season_type: 'winter', season_year: season_year + 1 };

    default:
      return { season_type: 'winter', season_year };
  }
}