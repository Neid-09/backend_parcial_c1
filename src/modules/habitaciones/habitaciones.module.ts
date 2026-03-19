import { Module } from '@nestjs/common';
import { HabitacionService } from './habitaciones.service';
import { HabitacionController } from './habitaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from './entities/habitaciones.entity';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion]), CategoriasModule],
  controllers: [HabitacionController],
  providers: [HabitacionService],
})
export class HabitacionesModule {}
