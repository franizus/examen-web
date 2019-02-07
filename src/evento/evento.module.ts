import { UsuarioModule } from './../usuario/usuario.module';
import { JugadorModule } from './../jugador/jugador.module';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { EventoEntity } from './evento-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventoEntity]),
    JugadorModule,
    UsuarioModule,
  ],
  controllers: [EventoController],
  providers: [EventoService],
  exports: [EventoService],
})
export class EventoModule {}
