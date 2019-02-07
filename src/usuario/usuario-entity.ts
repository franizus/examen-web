import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RolEntity } from 'src/rol/rol-entity';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  password: string;

  @Column()
  fecha_nacimiento: string;

  @ManyToMany(type => RolEntity)
  @JoinTable()
  roles: RolEntity[];
}
