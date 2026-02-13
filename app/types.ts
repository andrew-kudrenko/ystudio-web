export interface PagedList<T = unknown> {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: T[];
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
  classDate: Date;
  startTime: string;
  endTime: string;
  price: number;
  capacity: number;
  instructorName: string;
  classType: string;
  notes: string;
  isCancelled: boolean;
  createdAt: Date;
  updatedAt: Date;
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
