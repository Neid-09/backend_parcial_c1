import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHabitacionDto {

  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsNumber()
  piso: number;

  @IsNotEmpty()
  @IsNumber()
  categoriaId: number;
}