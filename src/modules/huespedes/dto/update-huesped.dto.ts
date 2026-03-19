import { IsString, IsOptional } from 'class-validator';

export class UpdateHuespedDto {

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}