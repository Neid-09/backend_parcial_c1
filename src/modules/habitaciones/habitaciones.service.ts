import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitacion } from './entities/habitaciones.entity';
import { Repository } from 'typeorm';
import { CreateHabitacionDto } from './dto/create-habitaciones.dto';
import { Categoria } from '../categorias/entities/categoria.entity';

@Injectable()
export class HabitacionService {

  constructor(
    @InjectRepository(Habitacion)
    private habitacionRepo: Repository<Habitacion>,

    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async create(data: CreateHabitacionDto) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id: data.categoriaId }
    });

    if (!categoria) {
      throw new Error('Categoría no encontrada');
    }

    const habitacion = this.habitacionRepo.create({
      numero: data.numero,
      piso: data.piso,
      categoria: categoria
    });

    return this.habitacionRepo.save(habitacion);
  }

  findAll() {
    return this.habitacionRepo.find({
      relations: ['categoria']
    });
  }
}