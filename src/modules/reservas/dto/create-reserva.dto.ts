import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateReservaDto {
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
