import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateEstadiaDto {
  @IsDateString()
  @IsNotEmpty()
  fecha_inicio: Date;

  @IsDateString()
  @IsNotEmpty()
  fecha_fin: Date;

  @IsNumber()
  @IsNotEmpty()
  huespedId: number;

  @IsNumber()
  @IsNotEmpty()
  habitacionId: number;
}