import { JugadorEntity } from './jugador-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

@Injectable()
export class JugadorService {
  constructor(
    @InjectRepository(JugadorEntity)
    private readonly _jugadorRepository: Repository<JugadorEntity>,
  ) {}

  buscar(
    parametros?: FindManyOptions<JugadorEntity>,
  ): Promise<JugadorEntity[]> {
    return this._jugadorRepository.find(parametros);
  }

  async crear(nuevojugador: JugadorEntity): Promise<JugadorEntity> {
    const jugadorEntity = this._jugadorRepository.create(nuevojugador);

    const jugadorCreado = await this._jugadorRepository.save(jugadorEntity);

    return jugadorCreado;
  }

  actualizar(
    idJugador: number,
    nuevojugador: JugadorEntity,
  ): Promise<JugadorEntity> {
    nuevojugador.id = idJugador;

    const jugadorEntity = this._jugadorRepository.create(nuevojugador);

    return this._jugadorRepository.save(jugadorEntity);
  }

  borrar(idJugador: number): Promise<JugadorEntity> {
    const jugadorEntityAEliminar = this._jugadorRepository.create({
      id: idJugador,
    });

    return this._jugadorRepository.remove(jugadorEntityAEliminar);
  }

  buscarPorId(idJugador: number): Promise<JugadorEntity> {
    return this._jugadorRepository.findOne(idJugador, {
      relations: ['eventos', 'equipo'],
    });
  }
}
