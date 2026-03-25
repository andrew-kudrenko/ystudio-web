export interface PaginatedResponse<T = unknown> {
  hasNext: boolean;
  hasPrevious: boolean;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: T[];
}

export interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InstructorListItem {
  id: number;
  fullName: string;
  phone?: string;
  isActive: boolean;
  totalClasses: number;
}

export interface Studio {
  id: number;
  name: string;
  address: string;
  description: string;
  capacity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  registrationDate: Date;
  notes: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Membership {
  id: number;
  name: string;
  description: string;
  price: number;
  classCount: number;
  validityDays: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Class {
  id: number;
  studioId: number;
  instructorId: number;
  classDate: string;
  startTime: string;
  endTime: string;
  price: number;
  capacity: number;
  title: string;
  notes: string;
  isCancelled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClassListItemDto {
  id: number;
  studioName: string;
  instructorName: string;
  classDate: string;
  startTime: string;
  endTime: string;
  price: number;
  capacity: number;
  title: string;
  notes: string;
  isCancelled: boolean;
}

export interface ClassBooking {
  id: number;
  classId: number;
  memberId: number;
  membershipId: number;
  bookingDate: Date;
  status: string;
  paymentStatus: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassBookingListItemDto {
  id: number;
  status: string;
  memberFullName: string;
  classDate: string;
  classTitle: string;
  updatedAt: string;
  notes: string;
}
