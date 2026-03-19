import { Module } from '@nestjs/common';
import { HabitacionService } from './habitaciones.service';
import { HabitacionController } from './habitaciones.controller';

@Module({
  controllers: [HabitacionController],
  providers: [HabitacionService],
})
export class HabitacionesModule {}
