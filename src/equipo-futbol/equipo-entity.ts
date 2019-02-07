import { JugadorEntity } from './../jugador/jugador-entity';
import { UsuarioEntity } from './../usuario/usuario-entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('equipo')
export class EquipoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  liga: string;

  @Column()
  fecha_creacion: string;

  @Column()
  numero_copas_internacionales: number;

  @Column()
  campeon_actual: boolean;

  @ManyToOne(type => UsuarioEntity, usuario => usuario.equipos)
  usuario: UsuarioEntity;

  @OneToMany(type => JugadorEntity, jugador => jugador.equipo)
  jugadores: JugadorEntity[];
}
