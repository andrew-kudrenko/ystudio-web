import type { Class } from "~/types";
import {
  queryFromDateRange,
  useClassesPageQuery,
  type ClassesPageQuery,
} from "./useClassesPageQuery";

import {
  CalendarDateTime,
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import {
  zonedDateTimeToCalendarDateTime,
  type DateRange,
} from "~/modules/shared/lib/date.utils";

export function useClassesPage() {
  const classesPageQuery = useClassesPageQuery();

  const dateRange = shallowRef(dateRangeFromQuery(classesPageQuery.getQuery()));

  const fetchClassesQuery = computed(() => queryFromDateRange(dateRange.value));

  const fetchClassesApi = useApi<Class[]>("/classes", {
    query: fetchClassesQuery,
    lazy: true,
    key: "classes.fetch",
  });

  watchEffect(async () => {
    if (isDateRangeValid()) {
      await fetchClassesApi.execute();
      classesPageQuery.sync(dateRange.value);
    }
  });

  function isDateRangeValid() {
    const { start, end } = dateRange.value;

    if (start && end) {
      return end.compare(start) >= 0;
    }

    return false;
  }

  return {
    dateRange,
    data: fetchClassesApi.data,
    loading: fetchClassesApi.pending,
  };
}

export function dateRangeFromQuery(
  query: ClassesPageQuery,
): DateRange<CalendarDateTime> {
  try {
    const start = query.dateFrom
      ? zonedDateTimeToCalendarDateTime(parseAbsoluteToLocal(query.dateFrom))
      : zonedDateTimeToCalendarDateTime(now(getLocalTimeZone()));

    const end = query.dateTo
      ? zonedDateTimeToCalendarDateTime(parseAbsoluteToLocal(query.dateTo))
      : start
          .add({ days: 7 })
          .set({ hour: 23, minute: 59, second: 59, millisecond: 99 });

    return {
      start,
      end,
    };
  } catch (e) {
    console.warn("Parse date error", e);

    const start = zonedDateTimeToCalendarDateTime(now(getLocalTimeZone()));

    const end = start
      .add({ days: 7 })
      .set({ hour: 23, minute: 59, second: 59, millisecond: 99 });

    return {
      start,
      end,
    };
  }
}
