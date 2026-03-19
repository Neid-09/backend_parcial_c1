import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadiasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadiaDto: UpdateEstadiaDto) {
    return this.estadiasService.update(+id, updateEstadiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadiasService.remove(+id);
  }
}
