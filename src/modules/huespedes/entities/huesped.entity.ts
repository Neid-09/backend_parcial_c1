
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
//import { Reserva } from '../../reservas/reservas.entity';

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

  // relacion
  /*@OneToMany(() => Reserva, (reserva) => reserva.huesped)
  reservas: Reserva[];*/
}