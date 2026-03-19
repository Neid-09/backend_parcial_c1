import { Module } from '@nestjs/common';
import { EstadiasService } from './estadias.service';
import { EstadiasController } from './estadias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estadia } from './entities/estadia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estadia])],
  controllers: [EstadiasController],
  providers: [EstadiasService],
})
export class EstadiasModule {}
