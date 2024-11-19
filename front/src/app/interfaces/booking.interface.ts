export interface IBOOKING{
  bookingId?: string;
  realStateId: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  totalPrice?: number;
  rating?: number;
}