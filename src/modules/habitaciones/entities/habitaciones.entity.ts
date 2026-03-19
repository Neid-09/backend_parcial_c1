import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
//import { Categoria } from '../../categorias/categoria.entity';

@Entity()
export class Habitacion {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: string;

  @Column()
  piso: number;

 // @ManyToOne(() => Categoria, (categoria) => categoria.habitaciones) relacion con categoria
  //categoria: Categoria;
}