import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Huesped } from './entities/huesped.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHuespedDto } from './dto/create-huesped.dto';
import { UpdateHuespedDto } from './dto/update-huesped.dto';

@Injectable()
export class HuespedesService {

  constructor(
    @InjectRepository(Huesped)
    private readonly huespedRepository: Repository<Huesped>,
  ) {}

  create(data: CreateHuespedDto) {
    return this.huespedRepository.save(data);
  }

  findAll() {
    return this.huespedRepository.find();
  }

  findOne(id: number) {
    return this.huespedRepository.findOne({
      where: { id },
    });
  }

  update(id: number, data: UpdateHuespedDto) {
    return this.huespedRepository.update(id, data);
  }

  remove(id: number) {
    return this.huespedRepository.delete(id);
  }

 
  findWithReservas(id: number) {
    return this.huespedRepository.findOne({
      where: { id },
      relations: ['reservas'],
    });
  }
}