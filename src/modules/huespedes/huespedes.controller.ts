import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { HuespedesService } from './huespedes.service';
import { CreateHuespedDto } from './dto/create-huesped.dto';
import { UpdateHuespedDto } from './dto/update-huesped.dto';

@Controller('huespedes')
export class HuespedesController {

  constructor(private readonly huespedesService: HuespedesService) {}

  @Post()
  create(@Body() data: CreateHuespedDto) {
    return this.huespedesService.create(data);
  }

  @Get()
  findAll() {
    return this.huespedesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.huespedesService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateHuespedDto) {
    return this.huespedesService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.huespedesService.remove(Number(id));
  }

 
  @Get(':id/reservas')
  historial(@Param('id') id: string) {
    return this.huespedesService.findWithReservas(Number(id));
  }
}