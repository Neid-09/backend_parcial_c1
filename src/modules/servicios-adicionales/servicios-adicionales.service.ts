import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServiciosAdicional } from './entities/servicios-adicionale.entity';
import { CreateServiciosAdicionalDto } from './dto/create-servicios-adicionale.dto';
import { UpdateServiciosAdicionalDto } from './dto/update-servicios-adicionale.dto';

@Injectable ()
export class ServiciosAdicionalesService {

  constructor (
    @InjectRepository ( ServiciosAdicional )
    private repo: Repository<ServiciosAdicional>,
  ) {}

  create ( dto: CreateServiciosAdicionalDto ) {
    const servicio = this.repo.create ( dto );
    return this.repo.save ( servicio );
  }

  findAll () {
    return this.repo.find ();
  }

  findOne ( id: number ) {
    return this.repo.findOneBy ( { id } );
  }

  update ( id: number, dto: UpdateServiciosAdicionalDto ) {
    return this.repo.update ( id, dto ) ;
  }

  remove ( id: number ) {
    return this.repo.delete ( id ) ;
  }
}