export interface CreateClassBookingRequest {
  classId: number;
  memberIds: number[];
}

export interface ClassBookingDto {
  id: number;
  classDate: string;
  classTitle: string;
  memberFullName: string;
  bookingStatus: number;
  bookingStatusDisplayName: string;
  notes: string;
  updatedAt: string;
}
