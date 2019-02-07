import { EquipoService } from 'src/equipo-futbol/equipo.service';
import { Like } from 'typeorm';
import { JugadorCreateDto } from './dto/jugador-create.dto';
import { JugadorEntity } from './jugador-entity';
import { JugadorService } from './jugador.service';
import {
  Controller,
  Post,
  Res,
  Body,
  Get,
  Query,
  Session,
} from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('jugador')
export class JugadorController {
  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _jugadorService: JugadorService,
    private readonly _equipoService: EquipoService,
  ) {}

  @Get('inicio')
  async inicio(@Res() response, @Query('busqueda') busqueda: string) {
    let jugadores: JugadorEntity[];
    if (busqueda) {
      const consulta = {
        where: [
          {
            nombre_completo_jugador: Like(`%${busqueda}%`),
          },
        ],
        relations: ['equipo'],
      };
      jugadores = await this._jugadorService.buscar(consulta);
    } else {
      const consulta = {
        relations: ['equipo'],
      };
      jugadores = await this._jugadorService.buscar(consulta);
    }

    console.log(jugadores);

    response.render('jugador-inicio', {
      titulo: 'Jugadores',
      arreglo: jugadores,
    });
  }

  @Get('crear')
  async crearGet(@Res() response, @Session() sesion) {
    if (sesion.usuario.roles.some(rol => rol.id === 2)) {
      const usuario = await this._usuarioService.buscarPorId(sesion.usuario.id);
      const equipos = usuario.equipos;

      response.render('jugador-crear', {
        titulo: 'Crear Jugador',
        equipos: equipos,
      });
    } else {
      response.redirect('/sin-permiso');
    }
  }

  @Post('crear')
  async crear(@Body() jugador: JugadorEntity, @Res() response) {
    const jugadorValidado = new JugadorCreateDto();

    const equipo = await this._equipoService.buscarPorId(+jugador.equipo);
    jugador.equipo = equipo;
    jugador.numero_camiseta = +jugador.numero_camiseta;

    jugadorValidado.numero_camiseta = jugador.numero_camiseta;
    jugadorValidado.nombre_camiseta = jugador.nombre_camiseta;
    jugadorValidado.nombre_completo_jugador = jugador.nombre_completo_jugador;
    jugadorValidado.poder_especial_dos = jugador.poder_especial_dos;
    jugadorValidado.fecha_ingreso_equipo = jugador.fecha_ingreso_equipo;
    jugadorValidado.goles = jugador.goles;

    const errores: ValidationError[] = await validate(jugadorValidado);

    const hayErrores = errores.length > 0;

    if (hayErrores) {
      console.error(errores);
      response.redirect('/jugador/crear?error=Hay errores');
    } else {
      await this._jugadorService.crear(jugador);
      response.redirect('/jugador/inicio');
    }
  }
}
