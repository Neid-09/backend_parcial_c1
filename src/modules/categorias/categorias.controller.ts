import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
 
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}
 
  /**
   * POST /categorias
   * Registra un nuevo tipo de habitación (ej: Suite, Doble, Sencilla).
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }
 
  /**
   * GET /categorias
   * Retorna la lista completa de categorías de habitación.
   */
  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }
 
  /**
   * GET /categorias/:id
   * Retorna los datos de una categoría específica.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.findOne(id);
  }
 
  /**
   * PATCH /categorias/:id
   * Actualiza parcialmente una categoría existente.
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }
 
  /**
   * DELETE /categorias/:id
   * Elimina una categoría por su ID.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.remove(id);
  }
}