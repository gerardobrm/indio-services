import { Dayjs } from 'dayjs';
export type { Dayjs };

export type DateRange = [Dayjs, Dayjs];

export class DateRangeFormat {
  static toISOString(range: DateRange | Dayjs[]) {
    const values = range.map(item => item.startOf('day').toISOString().replace(/T.*/, ''));
    return values;
  }

  static toString(range: DateRange | Dayjs[]) {
    const values = DateRangeFormat.toISOString(range);
    return values.join(', ');
  }

  static toPeriod(range: DateRange | Dayjs[]) {
    const values = DateRangeFormat.toISOString(range);
    const result = values.join('...');
    return result;
  }
}
