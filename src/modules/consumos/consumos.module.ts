import { Module } from '@nestjs/common';
import { ConsumosService } from './consumos.service';
import { ConsumosController } from './consumos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumo } from './entities/consumo.entity';
import { Estadia } from '../estadias/entities/estadia.entity';
import { ServiciosAdicional } from '../servicios-adicionales/entities/servicios-adicionale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consumo, Estadia, ServiciosAdicional])],
  controllers: [ConsumosController],
  providers: [ConsumosService],
  exports: [ConsumosService],
})
export class ConsumosModule {}
