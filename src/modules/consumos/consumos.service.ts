import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumo } from './entities/consumo.entity';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { Estadia } from '../estadias/entities/estadia.entity';
import { ServiciosAdicional } from '../servicios-adicionales/entities/servicios-adicionale.entity';

@Injectable()
export class ConsumosService {
  constructor(
    @InjectRepository(Consumo)
    private readonly consumoRepo: Repository<Consumo>,
    @InjectRepository(Estadia)
    private readonly estadiaRepo: Repository<Estadia>,
    @InjectRepository(ServiciosAdicional)
    private readonly servicioRepo: Repository<ServiciosAdicional>,
  ) {}

  async create(createConsumoDto: CreateConsumoDto) {
    const estadia = await this.estadiaRepo.findOne({ where: { id: createConsumoDto.estadiaId } });
    if (!estadia) throw new NotFoundException('Estadía no encontrada');

    const servicio = await this.servicioRepo.findOne({ where: { id: createConsumoDto.servicioId } });
    if (!servicio) throw new NotFoundException('Servicio Adicional no encontrado');

    const nuevoConsumo = this.consumoRepo.create({
      estadia,
      servicio,
      cantidad: createConsumoDto.cantidad,
    });

    return this.consumoRepo.save(nuevoConsumo);
  }

  findAll() {
    return this.consumoRepo.find({ relations: ['estadia', 'servicio'] });
  }

  findByEstadia(estadiaId: number) {
    return this.consumoRepo.find({
      where: { estadia: { id: estadiaId } },
      relations: ['servicio'],
    });
  }
}
