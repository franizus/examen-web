import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('evento')
export class EventoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  latitud: string;

  @Column()
  longitud: string;
}
