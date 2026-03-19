import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { Categoria } from './entities/categoria.entity';
 
@Module({
  // Registra la entidad para que TypeORM la gestione en este módulo
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  // Exportamos el servicio por si otros módulos necesitan
  // consultar el precio base de una categoría (ej: módulo de Facturación)
  exports: [CategoriasService],
})
export class CategoriasModule {}
 