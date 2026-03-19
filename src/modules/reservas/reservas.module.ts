import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Huesped } from '../huespedes/entities/huesped.entity';
import { Habitacion } from '../habitaciones/entities/habitaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Huesped, Habitacion])],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
