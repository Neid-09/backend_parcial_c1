import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitacionDto } from './create-habitaciones.dto';

export class UpdateHabitacioneDto extends PartialType(CreateHabitacionDto) {}
