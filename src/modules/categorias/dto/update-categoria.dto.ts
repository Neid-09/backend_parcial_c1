
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
 
// PartialType hereda todas las validaciones del DTO base
// pero hace todos los campos opcionales (útil para PATCH)
export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}