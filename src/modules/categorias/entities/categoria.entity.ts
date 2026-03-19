import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
 
@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ length: 100, unique: true })
  nombre: string; // Ej: Suite, Doble, Sencilla
 
  @Column('text', { nullable: true })
  descripcion: string;
 
  @Column('decimal', { precision: 10, scale: 2, name: 'precio_base_noche' })
  precioBaseNoche: number;
 
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
 
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
 
  // Relación: Una categoría puede tener muchas habitaciones
  // Se dejará lista para que el módulo de Inventario la complete con @ManyToOne
  // @OneToMany(() => Habitacion, (habitacion) => habitacion.categoria)
  // habitaciones: Habitacion[];
}