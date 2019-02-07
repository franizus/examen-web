import { JugadorModule } from './jugador/jugador.module';
import { EventoModule } from './evento/evento.module';
import { EventoEntity } from 'src/evento/evento-entity';
import { JugadorEntity } from './jugador/jugador-entity';
import { EquipoEntity } from 'src/equipo-futbol/equipo-entity';
import { AdministradorModule } from './administrador/administrador.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioEntity } from './usuario/usuario-entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from './rol/rol-entity';
import { EquipoModule } from './equipo-futbol/equipo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3302,
      username: 'francisco',
      password: '123456789',
      database: 'examenweb',
      synchronize: true,
      dropSchema: false,
      entities: [
        UsuarioEntity,
        RolEntity,
        EquipoEntity,
        JugadorEntity,
        EventoEntity,
      ],
    }),
    UsuarioModule,
    AdministradorModule,
    EventoModule,
    JugadorModule,
    EquipoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
