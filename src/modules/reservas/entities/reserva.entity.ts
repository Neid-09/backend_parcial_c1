import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Huesped } from '../../huespedes/entities/huesped.entity';
import { Habitacion } from '../../habitaciones/entities/habitaciones.entity';

@Entity()
export class Reserva {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date' })
  fecha_fin: Date;

  @ManyToOne(() => Huesped, (huesped) => huesped.reservas)
  huesped: Huesped;

  @ManyToOne(() => Habitacion, (habitacion) => habitacion.reservas)
  habitacion: Habitacion;
}