import { Module } from '@nestjs/common';
import { EstadiasService } from './estadias.service';
import { EstadiasController } from './estadias.controller';

@Module({
  controllers: [EstadiasController],
  providers: [EstadiasService],
})
export class EstadiasModule {}
