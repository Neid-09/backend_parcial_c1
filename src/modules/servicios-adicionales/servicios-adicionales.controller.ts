import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ServiciosAdicionalesService } from './servicios-adicionales.service';
import { CreateServiciosAdicionalDto } from './dto/create-servicios-adicionale.dto';
import { UpdateServiciosAdicionalDto } from './dto/update-servicios-adicionale.dto';

@Controller ( 'servicios-adicionales' )
export class ServiciosAdicionalesController {

  constructor ( private readonly service: ServiciosAdicionalesService ) {}

  @Post ()
  create ( @Body () dto: CreateServiciosAdicionalDto ) {
    return this.service.create ( dto );
  }

  @Get ( 'activos' )
findActivos () {
  return this.service.findAll () .then ( data =>
    data.filter ( s => s.activo )
  );
}

  @Get ()
  findAll () {
    return this.service.findAll ();
  }

  @Get ( ':id' )
  findOne ( @Param ( 'id' ) id: string ) {
    return this.service.findOne ( +id );
  }

  @Patch ( ':id' )
  update ( @Param ( 'id' ) id: string, @Body () dto: UpdateServiciosAdicionalDto ) {
    return this.service.update ( +id, dto );
  }

  @Delete ( ':id' )
  remove ( @Param ( 'id' ) id: string ) {
    return this.service.remove ( +id );
  }
}