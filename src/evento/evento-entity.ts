import { JugadorEntity } from './../jugador/jugador-entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('evento')
export class EventoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  fecha: string;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @ManyToMany(type => JugadorEntity, jugador => jugador.eventos)
  jugadores: JugadorEntity[];
}
