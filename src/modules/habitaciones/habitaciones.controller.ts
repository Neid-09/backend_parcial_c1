import { Controller, Post, Body, Get } from '@nestjs/common';
import { HabitacionService } from './habitaciones.service';
import { CreateHabitacionDto } from './dto/create-habitaciones.dto';

@Controller('habitaciones')
export class HabitacionController {

  constructor(private readonly habitacionService: HabitacionService) {}

  @Post()
  create(@Body() data: CreateHabitacionDto) {
    return this.habitacionService.create(data);
  }

  @Get()
  findAll() {
    return this.habitacionService.findAll();
  }
}