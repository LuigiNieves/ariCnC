import { IsString, IsNumber, IsUUID, IsPositive, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateRealStateDto {
  @IsUUID()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  // @IsNumber()
  // latitude: number;

  // @IsNumber()
  // longitude: number;

  @IsPositive()
  price: number;


  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  // @IsNumber()
  // @Min(1)
  // numBedrooms: number;

  // @IsNumber()
  // @Min(1)
  // numBathrooms: number;

  // @IsNumber()
  // @Min(1)
  // maxGuests: number;
}
