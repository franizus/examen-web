import { UsuarioModule } from './../usuario/usuario.module';
import { Module } from '@nestjs/common';
import { AdministradorController } from './administrador.controller';

@Module({
  imports: [UsuarioModule],
  controllers: [AdministradorController],
  providers: [],
  exports: [],
})
export class AdministradorModule {}
