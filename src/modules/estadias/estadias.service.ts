import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Estadia } from './entities/estadia.entity';
import { CreateEstadiaDto } from './dto/create-estadia.dto';
import { UpdateEstadiaDto } from './dto/update-estadia.dto';

@Injectable()
export class EstadiasService {

  constructor(
    @InjectRepository(Estadia)
    private readonly estadiaRepo: Repository<Estadia>,
  ) {}

  async create(createEstadiaDto: CreateEstadiaDto) {

    // 🔥 VALIDACIÓN CLAVE: evitar sobreventa
    const existe = await this.estadiaRepo.findOne({
      where: {
        habitacionId: createEstadiaDto.habitacionId,
        activa: true,
        fecha_inicio: LessThanOrEqual(createEstadiaDto.fecha_fin),
        fecha_fin: MoreThanOrEqual(createEstadiaDto.fecha_inicio),
      },
    });

    if (existe) {
      throw new BadRequestException(
        'La habitación ya tiene una estadía activa en esas fechas',
      );
    }

    const nuevaEstadia = this.estadiaRepo.create(createEstadiaDto);
    return this.estadiaRepo.save(nuevaEstadia);
  }

  findAll() {
    return this.estadiaRepo.find();
  }

  // 🔄 UPDATE (con validación también)
  async update(id: number, updateData: UpdateEstadiaDto) {

    const estadia = await this.estadiaRepo.findOne({ where: { id } });

    if (!estadia) {
      throw new BadRequestException('Estadía no encontrada');
    }

    // 🔥 VALIDAR CRUCE DE FECHAS (igual que en create)
    const existe = await this.estadiaRepo.findOne({
      where: {
        habitacionId: updateData.habitacionId ?? estadia.habitacionId,
        activa: true,
        fecha_inicio: LessThanOrEqual(updateData.fecha_fin ?? estadia.fecha_fin),
        fecha_fin: MoreThanOrEqual(updateData.fecha_inicio ?? estadia.fecha_inicio),
      },
    });

    // ⚠️ evitar conflicto consigo misma
    if (existe && existe.id !== id) {
      throw new BadRequestException(
        'Conflicto de fechas en la habitación',
      );
    }

    Object.assign(estadia, updateData);

    return this.estadiaRepo.save(estadia);
  }
}