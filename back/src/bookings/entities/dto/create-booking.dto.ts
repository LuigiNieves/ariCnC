import { IsUUID, IsDateString, IsNumber, IsPositive } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  realStateId: string;

  @IsUUID()
  userId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsPositive()
  totalPrice: number;
}
