import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Estadia } from '../../estadias/entities/estadia.entity';
import { ServiciosAdicional } from '../../servicios-adicionales/entities/servicios-adicionale.entity';

@Entity('consumos')
export class Consumo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Estadia, (estadia) => estadia.consumos, { onDelete: 'CASCADE' })
  estadia: Estadia;

  @ManyToOne(() => ServiciosAdicional, { onDelete: 'CASCADE' })
  servicio: ServiciosAdicional;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @CreateDateColumn({ name: 'fecha_consumo' })
  fecha: Date;
}
