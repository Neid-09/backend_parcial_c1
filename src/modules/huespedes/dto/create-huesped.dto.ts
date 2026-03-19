import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHuespedDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}