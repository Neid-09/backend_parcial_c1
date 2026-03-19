import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateServiciosAdicionalDto {

    @IsString()
  nombre?: string;

  @IsNumber()
  @Min(0)
  precio?: number;

  @IsOptional()
  activo?: boolean;
}


