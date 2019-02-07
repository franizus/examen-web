import { UsuarioModule } from './../usuario/usuario.module';
import { JugadorController } from './jugador.controller';
import { JugadorService } from './jugador.service';
import { JugadorEntity } from './jugador-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EquipoModule } from 'src/equipo-futbol/equipo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JugadorEntity]),
    UsuarioModule,
    EquipoModule,
  ],
  controllers: [JugadorController],
  providers: [JugadorService],
  exports: [JugadorService],
})
export class JugadorModule {}
