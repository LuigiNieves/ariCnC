import { IsUUID, IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  realStateId: string;

  @IsUUID()
  userId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;
}
