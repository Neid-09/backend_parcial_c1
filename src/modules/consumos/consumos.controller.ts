import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConsumosService } from './consumos.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Controller('consumos')
export class ConsumosController {
  constructor(private readonly consumosService: ConsumosService) {}

  @Post()
  create(@Body() createConsumoDto: CreateConsumoDto) {
    return this.consumosService.create(createConsumoDto);
  }

  @Get()
  findAll() {
    return this.consumosService.findAll();
  }

  @Get('estadia/:estadiaId')
  findByEstadia(@Param('estadiaId') estadiaId: string) {
    return this.consumosService.findByEstadia(+estadiaId);
  }
}
