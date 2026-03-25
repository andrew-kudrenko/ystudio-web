export interface ClassMemberListItemDto {
  memberId: number;
  fullName: string;
  phone: string;
}

export interface ClassDetailsDto {
  class: ClassDto;
  instructor: ClassInstructorDto;
  studio: ClassStudioDto;
  visits: ClassVisitDto[];
  members: MemberListItemDto[];
}

export interface MemberListItemDto {
  id: number;
  fullName: string;
  phone: string;
  notes: string;
}

export interface ClassDto {
  id: number;
  title: string;
  classDate: string;
  startTime: string;
  endTime: string;
  price: number;
  capacity: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClassInstructorDto {
  id: number;
  firstName: string;
  lastName: string;
}

export interface ClassStudioDto {
  id: number;
  name: string;
}

export interface ClassPaymentDto {
  id: number;
  amount: number;
  method: number;
  status: number;
  methodDisplayName: string;
  statusDisplayName: string;
}

export interface ClassVisitMemberDto {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ClassBookingDto {
  id: number;
  status: number;
  statusDisplayName: string;
}

export interface ClassVisitDto {
  visitStatus?: number;
  visitStatusDisplayName?: string;
  member: ClassVisitMemberDto;
  lastPayment?: ClassPaymentDto;
  booking?: ClassBookingDto;
}
