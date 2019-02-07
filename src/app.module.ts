import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioEntity } from './usuario/usuario-entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from './rol/rol-entity';

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
      entities: [UsuarioEntity, RolEntity],
    }),
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
