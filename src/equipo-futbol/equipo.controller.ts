import { Like } from 'typeorm';
import { EquipoCreateDto } from './dto/equipo-create.dto';
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
import { EquipoService } from './equipo.service';
import { EquipoEntity } from './equipo-entity';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly _equipoService: EquipoService) {}

  @Get('inicio')
  async inicio(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Session() sesion,
  ) {
    if (sesion.usuario) {
      const esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
      const esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
      if (esUsuario) {
        let equipos: EquipoEntity[];
        if (busqueda) {
          const consulta = {
            where: [
              {
                nombre: Like(`%${busqueda}%`),
              },
            ],
          };
          equipos = await this._equipoService.buscar(consulta);
        } else {
          equipos = await this._equipoService.buscar();
        }

        response.render('equipo-inicio', {
          titulo: 'Equipos',
          arreglo: equipos,
          esUsuario: esUsuario,
          esAdministrador: esAdministrador,
          logedin: true,
          nombreUsuario: sesion.usuario.nombre,
        });
      } else {
        response.redirect('/sin-permiso');
      }
    } else {
      response.redirect('/');
    }
  }

  @Get('crear')
  crearGet(@Res() response, @Session() sesion, @Query('error') error: string) {
    if (sesion.usuario) {
      const esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
      const esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
      if (esUsuario) {
        response.render('equipo-crear', {
          titulo: 'Crear Equipo',
          esUsuario: esUsuario,
          esAdministrador: esAdministrador,
          logedin: true,
          nombreUsuario: sesion.usuario.nombre,
          error: error,
        });
      } else {
        response.redirect('/sin-permiso');
      }
    } else {
      response.redirect('/');
    }
  }

  @Post('crear')
  async crear(
    @Body() equipo: EquipoEntity,
    @Res() response,
    @Session() sesion,
  ) {
    const esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
    if (esUsuario) {
      const equipoValidado = new EquipoCreateDto();
      const bValue = equipo.campeon_actual + '';
      equipo.numero_copas_internacionales = +equipo.numero_copas_internacionales;
      equipo.campeon_actual = bValue == 'true';

      equipoValidado.nombre = equipo.nombre;
      equipoValidado.liga = equipo.liga;
      equipoValidado.fecha_creacion = equipo.fecha_creacion;
      equipoValidado.numero_copas_internacionales =
        equipo.numero_copas_internacionales;
      equipoValidado.campeon_actual = equipo.campeon_actual;

      const errores: ValidationError[] = await validate(equipoValidado);

      const hayErrores = errores.length > 0;

      equipo.usuario = sesion.usuario;

      if (hayErrores) {
        console.error(errores);
        response.redirect('/equipo/crear?error=Hay errores');
      } else {
        await this._equipoService.crear(equipo);
        response.redirect('/equipo/inicio');
      }
    } else {
      response.redirect('/sin-permiso');
    }
  }
}
