import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class EquipoCreateDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  liga: string;

  @IsNotEmpty()
  fecha_creacion: string;

  @IsNotEmpty()
  @IsNumber()
  numero_copas_internacionales: number;

  @IsNotEmpty()
  @IsBoolean()
  campeon_actual: boolean;
}
