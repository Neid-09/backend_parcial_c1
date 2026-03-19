import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
 
export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio.' })
  @IsString()
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres.' })
  nombre: string;
 
  @IsOptional()
  @IsString()
  descripcion?: string;
 
  @IsNotEmpty({ message: 'El precio base por noche es obligatorio.' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número válido (máx. 2 decimales).' })
  @IsPositive({ message: 'El precio base por noche debe ser mayor a 0.' })
  @Min(1)
  precioBaseNoche: number;
}