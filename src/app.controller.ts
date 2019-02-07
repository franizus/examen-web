import { UsuarioCreateDto } from './usuario/dto/usuario-create.dto';
import { Controller, Get, Res, Post, Body, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { Usuario, UsuarioService } from './usuario/usuario.service';
import { ValidationError, validate } from 'class-validator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly _usuarioService: UsuarioService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(@Res() response) {
    response.render('login', {
      titulo: 'Registro',
      esUsuario: true,
      esAdministrador: true,
    });
  }

  @Post('login')
  async loginUser(
    @Body('correo') correo: string,
    @Body('password') password: string,
    @Res() response,
    @Session() sesion,
  ) {
    const identificado = await this._usuarioService.login(correo, password);

    if (identificado) {
      sesion.usuario = identificado;
      console.log(sesion);

      response.redirect('/');
    } else {
      response.redirect('/login?error=Hay errores');
    }
  }

  @Get('logout')
  logout(@Res() response, @Session() sesion) {
    sesion.usuario = undefined;
    sesion.destroy();
    response.redirect('/login');
  }

  @Get('register')
  register(@Res() response) {
    response.render('register', {
      titulo: 'Registro',
      esUsuario: true,
      esAdministrador: true,
    });
  }

  @Post('register')
  async registerUser(@Body() usuario: Usuario, @Res() response) {
    const usuarioValidado = new UsuarioCreateDto();

    usuarioValidado.nombre = usuario.nombre;
    usuarioValidado.correo = usuario.correo;
    usuarioValidado.password = usuario.password;
    usuarioValidado.fecha_nacimiento = usuario.fecha_nacimiento;

    const errores: ValidationError[] = await validate(usuarioValidado);

    const hayErrores = errores.length > 0;

    if (hayErrores) {
      console.error(errores);
      response.redirect('/register?error=Hay errores');
    } else {
      await this._usuarioService.crear(usuario);

      response.redirect('/login');
    }
  }
}
