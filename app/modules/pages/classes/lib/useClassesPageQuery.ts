import { CalendarDateTime, getLocalTimeZone } from "@internationalized/date";
import { type DateRange } from "~/modules/shared/lib/date.utils";

import { getQueryParamString } from "~/modules/shared/lib/query.utils";

export interface ClassesPageQuery {
  dateFrom: string | undefined;
  dateTo: string | undefined;
}

export function useClassesPageQuery() {
  const router = useRouter();
  const route = useRoute();

  function getQuery(): ClassesPageQuery {
    return {
      dateFrom: getQueryParamString(route.query, "dateFrom"),
      dateTo: getQueryParamString(route.query, "dateTo"),
    };
  }

  function sync(range: DateRange<CalendarDateTime>) {
    router.replace({
      path: route.path,
      query: { ...queryFromDateRange(range) },
    });
  }

  return { getQuery, sync };
}

export function queryFromDateRange(
  range: DateRange<CalendarDateTime>,
): ClassesPageQuery {
  range.start.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  range.end?.set({ hour: 23, minute: 59, second: 59, millisecond: 99 });

  const timezone = getLocalTimeZone();

  return {
    dateFrom: range.start.toDate(timezone).toISOString(),
    dateTo: range.end?.toDate(timezone).toISOString(),
  };
}
