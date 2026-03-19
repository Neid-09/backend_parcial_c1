import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity ( 'servicios_adicionales' )
export class ServiciosAdicional {
    @PrimaryGeneratedColumn ()
  id?: number;

  @Column ()
  nombre?: string;

  @Column ( 'decimal' )
  precio?: number;

  @Column ( { default: true } )
  activo?: boolean;
}
