import { EquipoController } from './../equipo-futbol/equipo.controller';
import { EquipoEntity } from 'src/equipo-futbol/equipo-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EquipoService } from 'src/equipo-futbol/equipo.service';

@Module({
  imports: [TypeOrmModule.forFeature([EquipoEntity])],
  controllers: [EquipoController],
  providers: [EquipoService],
  exports: [EquipoService],
})
export class EquipoModule {}
