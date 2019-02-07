import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdministradorController {
  @Get('inicio')
  inicio() {}
}
