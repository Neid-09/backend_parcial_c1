import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Estadia } from '../../estadias/entities/estadia.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity()
export class Habitacion {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: string;

  @Column()
  piso: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.habitaciones)
  categoria: Categoria;

  @OneToMany(() => Estadia, (estadia) => estadia.habitacion)
  estadias: Estadia[];

  @OneToMany(() => Reserva, (reserva) => reserva.habitacion)
  reservas: Reserva[];
}