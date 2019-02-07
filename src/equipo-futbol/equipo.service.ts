import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { EquipoEntity } from './equipo-entity';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(EquipoEntity)
    private readonly _equipoRepository: Repository<EquipoEntity>,
  ) {}

  buscar(parametros?: FindManyOptions<EquipoEntity>): Promise<EquipoEntity[]> {
    return this._equipoRepository.find(parametros);
  }

  async crear(nuevoEquipo: EquipoEntity): Promise<EquipoEntity> {
    const equipoEntity = this._equipoRepository.create(nuevoEquipo);

    const equipoCreado = await this._equipoRepository.save(equipoEntity);

    return equipoCreado;
  }

  actualizar(
    idEquipo: number,
    nuevoEquipo: EquipoEntity,
  ): Promise<EquipoEntity> {
    nuevoEquipo.id = idEquipo;

    const equipoEntity = this._equipoRepository.create(nuevoEquipo);

    return this._equipoRepository.save(equipoEntity);
  }

  borrar(idEquipo: number): Promise<EquipoEntity> {
    const equipoEntityAEliminar = this._equipoRepository.create({
      id: idEquipo,
    });

    return this._equipoRepository.remove(equipoEntityAEliminar);
  }

  buscarPorId(idEquipo: number): Promise<EquipoEntity> {
    return this._equipoRepository.findOne(idEquipo);
  }
}
