import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Estadia {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date' })
  fecha_fin: Date;

  @Column()
  huespedId: number;
  // 🔗 Relación: Estadía pertenece a un Huésped (N:1)

  @Column()
  habitacionId: number;
  // 🔗 Relación: Estadía pertenece a una Habitación (N:1)

  @Column({ default: true })
  activa: boolean;
}