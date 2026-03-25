export interface CreateClassBookingRequest {
  classId: number;
  memberId: number;
  notes?: string;
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
