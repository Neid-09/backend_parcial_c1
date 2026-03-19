import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiciosAdicional } from './entities/servicios-adicionale.entity';
import { ServiciosAdicionalesService } from './servicios-adicionales.service';
import { ServiciosAdicionalesController } from './servicios-adicionales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiciosAdicional])],
  controllers: [ServiciosAdicionalesController],
  providers: [ServiciosAdicionalesService],
  exports: [ServiciosAdicionalesService],
})
export class ServiciosAdicionalesModule {}