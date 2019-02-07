import { JugadorService } from './../jugador/jugador.service';
import { Like, In } from 'typeorm';
import { EventoCreateDto } from './dto/evento-create.dto';
import {
  Controller,
  Post,
  Res,
  Body,
  Get,
  Param,
  Query,
  Session,
} from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { EventoService } from './evento.service';
import { EventoEntity } from './evento-entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('evento')
export class EventoController {
  constructor(
    private readonly _eventoService: EventoService,
    private readonly _jugadorService: JugadorService,
    private readonly _usuarioService: UsuarioService,
  ) {}

  @Get('inicio')
  async inicio(@Res() response, @Query('busqueda') busqueda: string) {
    let eventos: EventoEntity[];
    if (busqueda) {
      const consulta = {
        where: [
          {
            nombre: Like(`%${busqueda}%`),
          },
        ],
      };
      eventos = await this._eventoService.buscar(consulta);
    } else {
      eventos = await this._eventoService.buscar();
    }

    response.render('eventos', {
      titulo: 'Eventos',
      arreglo: eventos,
    });
  }

  @Get('ver/:idEvento')
  async ver(@Res() response, @Param('idEvento') idEvento: string) {
    const evento = await this._eventoService.buscarPorId(Number(idEvento));

    response.render('evento-ver', {
      titulo: 'Evento ',
      evento: evento,
    });
  }

  @Get('crear')
  async crearGet(@Res() response, @Session() sesion) {
    if (sesion.usuario.roles.some(rol => rol.id === 2)) {
      const usuario = await this._usuarioService.buscarPorId(sesion.usuario.id);
      const equiposIds = usuario.equipos.map(equipo => {
        return equipo.id;
      });

      const consulta = {
        where: [
          {
            equipoId: In(equiposIds),
          },
        ],
        relations: ['equipo'],
      };
      const jugadores = await this._jugadorService.buscar(consulta);

      response.render('evento-crear', {
        titulo: 'Crear Evento',
        jugadores: jugadores,
      });
    } else {
      response.redirect('/sin-permiso');
    }
  }

  @Post('crear')
  async crear(@Body() evento: EventoEntity, @Res() response) {
    const jugadoresIds = evento.jugadores.map(value => {
      return +value;
    });
    const consulta = {
      where: [
        {
          id: In(jugadoresIds),
        },
      ],
      relations: ['equipo'],
    };
    const jugadores = await this._jugadorService.buscar(consulta);
    evento.jugadores = jugadores;

    const eventoValidado = new EventoCreateDto();

    eventoValidado.nombre = evento.nombre;
    eventoValidado.fecha = evento.fecha;
    eventoValidado.latitud = evento.latitud;
    eventoValidado.longitud = evento.longitud;

    const errores: ValidationError[] = await validate(eventoValidado);

    const hayErrores = errores.length > 0;

    if (hayErrores || evento.jugadores === undefined) {
      console.error(errores);
      response.redirect('/evento/crear?error=Hay errores');
    } else {
      await this._eventoService.crear(evento);
      response.redirect('/evento/inicio');
    }
  }
}
