export interface ClassBookingListItemDto {
  id: number;
  classId: number;
  memberId: number;
  bookingDate: string;
  status: string;
  paymentStatus: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
