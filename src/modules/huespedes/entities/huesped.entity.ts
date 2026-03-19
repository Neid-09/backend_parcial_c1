
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';
import { Estadia } from '../../estadias/entities/estadia.entity';

@Entity()
export class Huesped {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  documento: string;

  @Column({ nullable: true })
  telefono: string;

  @OneToMany(() => Reserva, (reserva) => reserva.huesped)
  reservas: Reserva[];

  @OneToMany(() => Estadia, (estadia) => estadia.huesped)
  estadias: Estadia[];
}