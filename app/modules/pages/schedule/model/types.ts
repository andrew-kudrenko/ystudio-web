import type { CalendarDate, Time } from "@internationalized/date";

export interface CreateClassFormValues {
  studioId: number;
  instructorId: number;
  classType: string;
  classDate: CalendarDate;
  startTime: Time;
  endTime: Time;
  price: number;
  capacity: number;
}
