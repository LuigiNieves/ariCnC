import {
  IsUUID,
  IsDateString,
  IsNumber,
  IsPositive,
  Min,
  Max,
} from 'class-validator';

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

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
