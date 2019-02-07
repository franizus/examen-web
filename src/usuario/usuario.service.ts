import { UsuarioEntity } from './usuario-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, getRepository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly _usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  buscar(
    parametros?: FindManyOptions<UsuarioEntity>,
  ): Promise<UsuarioEntity[]> {
    return this._usuarioRepository.find(parametros);
  }

  async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {
    // Instanciar una entidad -> .create()
    const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);

    // Guardar una entidad en la BDD -> .save()
    const usuarioCreado = await this._usuarioRepository.save(usuarioEntity);

    return usuarioCreado;
  }

  actualizar(idUsuario: number, nuevoUsuario: Usuario): Promise<UsuarioEntity> {
    nuevoUsuario.id = idUsuario;

    const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);

    return this._usuarioRepository.save(usuarioEntity);
  }

  borrar(idUsuario: number): Promise<UsuarioEntity> {
    // CREA UNA INSTANCIA DE LA ENTIDAD
    const usuarioEntityAEliminar = this._usuarioRepository.create({
      id: idUsuario,
    });

    return this._usuarioRepository.remove(usuarioEntityAEliminar);
  }

  buscarPorId(idUsuario: number): Promise<UsuarioEntity> {
    return this._usuarioRepository.findOne(idUsuario);
  }

  async obtenerRoles(idUsuario: number) {
    const usuarioEncontrado = await this._usuarioRepository.findOne(idUsuario);
  }

  async login(correo: string, password: string): Promise<UsuarioEntity> {
    const usuarioEncontrado = await this._usuarioRepository.findOne({
      where: {
        correo: correo,
      },
      relations: ['roles'],
    });

    if (usuarioEncontrado) {
      if (usuarioEncontrado.password === password) {
        return usuarioEncontrado;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
}

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  password: string;
  fecha_nacimiento: string;
}
