import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservasService {

  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepo: Repository<Reserva>,
  ) {}

  create(createReservaDto: CreateReservaDto) {
    const nueva = this.reservaRepo.create(createReservaDto);
    return this.reservaRepo.save(nueva);
  }

  findAll() {
    return this.reservaRepo.find();
  }

  // 🔄 UPDATE
  async update(id: number, updateData: UpdateReservaDto) {

    const reserva = await this.reservaRepo.findOne({ where: { id } });

    if (!reserva) {
      throw new Error('Reserva no encontrada');
    }

    Object.assign(reserva, updateData);

    return this.reservaRepo.save(reserva);
  }
}