import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reserva {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date' })
  fecha_fin: Date;

  @Column()
  huespedId: number;
  // 🔗 Relación: Reserva pertenece a un Huésped (N:1)

  @Column()
  habitacionId: number;
  // 🔗 Relación: Reserva pertenece a una Habitación (N:1)
}