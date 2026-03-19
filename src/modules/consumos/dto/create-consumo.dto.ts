import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateConsumoDto {
  @IsInt()
  @IsNotEmpty()
  estadiaId: number;

  @IsInt()
  @IsNotEmpty()
  servicioId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  cantidad: number;
}
