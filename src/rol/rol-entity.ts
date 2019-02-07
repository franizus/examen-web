import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rol')
export class RolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
