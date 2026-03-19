import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Controller('reservas')
export class ReservasController {

  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservasService.create(createReservaDto);
  }

  @Get()
  findAll() {
    return this.reservasService.findAll();
  }

  // 🔄 UPDATE
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservaDto: UpdateReservaDto,
  ) {
    return this.reservasService.update(+id, updateReservaDto);
  }
}