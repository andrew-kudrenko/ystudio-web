export const enum ClassPaymentMethod {
  Cash = 0,
  Online = 1,
  Credit = 2,
  Subscription = 3,
  Otherwise = 9,
}

export const enum ClassPaymentStatus {
  Pending = 0,
  Paid = 1,
  Failed = 2,
  Refunded = 3,
  Cancelled = 4,
  Unknown = 9,
}
