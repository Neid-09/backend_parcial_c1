import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { EstadiasService } from './estadias.service';
import { CreateEstadiaDto } from './dto/create-estadia.dto';
import { UpdateEstadiaDto } from './dto/update-estadia.dto';

@Controller('estadias')
export class EstadiasController {

  constructor(private readonly estadiasService: EstadiasService) {}

  @Post()
  create(@Body() createEstadiaDto: CreateEstadiaDto) {
    return this.estadiasService.create(createEstadiaDto);
  }

  @Get()
  findAll() {
    return this.estadiasService.findAll();
  }

  // 🔄 UPDATE (IMPORTANTE)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstadiaDto: UpdateEstadiaDto,
  ) {
    return this.estadiasService.update(+id, updateEstadiaDto);
  }
}