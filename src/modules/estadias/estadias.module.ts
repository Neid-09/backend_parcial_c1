import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadiasService } from './estadias.service';
import { EstadiasController } from './estadias.controller';
import { Estadia } from './entities/estadia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estadia])],
  controllers: [EstadiasController],
  providers: [EstadiasService],
})
export class EstadiasModule {}