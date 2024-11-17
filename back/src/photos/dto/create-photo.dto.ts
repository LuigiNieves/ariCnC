import { IsUUID, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsUUID()
  realStateId: string;

  @IsString()
  photoUrl: string;
}

