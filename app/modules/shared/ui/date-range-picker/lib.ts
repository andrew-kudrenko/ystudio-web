import {
  CalendarDateTime,
  DateFormatter,
  getLocalTimeZone,
  now,
  type DateValue,
} from "@internationalized/date";

const formatter = new DateFormatter("ru-RU", {
  dateStyle: "medium",
});

export function defaultDateRange() {
  const { year, month, day } = now(getLocalTimeZone());

  const start = new CalendarDateTime(year, month, day, 0, 0, 0, 0);

  return {
    start,
    end: start.add({
      days: 7,
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 99,
    }),
  };
}

export function formatDate(value: DateValue) {
  return formatter.format(value.toDate(getLocalTimeZone()));
}
