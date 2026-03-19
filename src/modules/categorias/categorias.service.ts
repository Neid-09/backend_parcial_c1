import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
 
@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}
 
  /**
   * Crea una nueva categoría de habitación.
   * Lanza ConflictException si ya existe una con el mismo nombre.
   */
  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const existe = await this.categoriaRepository.findOne({
      where: { nombre: createCategoriaDto.nombre },
    });
 
    if (existe) {
      throw new ConflictException(
        `Ya existe una categoría con el nombre "${createCategoriaDto.nombre}".`,
      );
    }
 
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }
 
  /**
   * Retorna todas las categorías registradas.
   */
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      order: { nombre: 'ASC' },
    });
  }
 
  /**
   * Retorna una categoría por su ID.
   * Lanza NotFoundException si no existe.
   */
  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });
 
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada.`);
    }
 
    return categoria;
  }
 
  /**
   * Actualiza los datos de una categoría existente.
   * Valida unicidad del nombre si se envía uno diferente al actual.
   */
  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.findOne(id);
 
    if (
      updateCategoriaDto.nombre &&
      updateCategoriaDto.nombre !== categoria.nombre
    ) {
      const nombreEnUso = await this.categoriaRepository.findOne({
        where: { nombre: updateCategoriaDto.nombre },
      });
 
      if (nombreEnUso) {
        throw new ConflictException(
          `Ya existe otra categoría con el nombre "${updateCategoriaDto.nombre}".`,
        );
      }
    }
 
    Object.assign(categoria, updateCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }
 
  /**
   * Elimina una categoría por ID.
   * Lanza NotFoundException si no existe.
   */
  async remove(id: number): Promise<{ message: string }> {
    const categoria = await this.findOne(id);
    await this.categoriaRepository.remove(categoria);
    return { message: `Categoría "${categoria.nombre}" eliminada correctamente.` };
  }
}
 