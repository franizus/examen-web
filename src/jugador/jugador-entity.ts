import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EquipoEntity } from 'src/equipo-futbol/equipo-entity';
import { EventoEntity } from 'src/evento/evento-entity';

@Entity('jugador')
export class JugadorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero_camiseta: number;

  @Column()
  nombre_camiseta: string;

  @Column()
  nombre_completo_jugador: string;

  @Column()
  poder_especial_dos: string;

  @Column()
  fecha_ingreso_equipo: string;

  @Column()
  goles: number;

  @ManyToMany(type => EventoEntity, evento => evento.jugadores)
  @JoinTable()
  eventos: EventoEntity[];

  @ManyToOne(type => EquipoEntity, equipo => equipo.jugadores)
  equipo: EquipoEntity;
}
