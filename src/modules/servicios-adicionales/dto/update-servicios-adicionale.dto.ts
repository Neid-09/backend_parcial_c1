import { PartialType } from '@nestjs/mapped-types';
import { CreateServiciosAdicionalDto } from './create-servicios-adicionale.dto';

export class UpdateServiciosAdicionalDto extends PartialType(CreateServiciosAdicionalDto) {}
