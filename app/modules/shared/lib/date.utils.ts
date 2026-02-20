import {
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
} from "@internationalized/date";

export function zonedDateTimeToCalendarDate({
  year,
  month,
  day,
}: ZonedDateTime) {
  return new CalendarDate(year, month, day);
}

export function zonedDateTimeToCalendarDateTime(value: ZonedDateTime) {
  return new CalendarDateTime(
    value.year,
    value.month,
    value.day,
    value.hour,
    value.minute,
    value.second,
    value.millisecond,
  );
}

export type DateRange<D> = { start: D; end?: D };
