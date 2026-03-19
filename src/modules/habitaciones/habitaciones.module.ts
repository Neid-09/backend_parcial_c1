import { Module } from '@nestjs/common';
import { HabitacionService } from './habitaciones.service';
import { HabitacionController } from './habitaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from './entities/habitaciones.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion, Categoria])],
  controllers: [HabitacionController],
  providers: [HabitacionService],
})
export class HabitacionesModule {}
