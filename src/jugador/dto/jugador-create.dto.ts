import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class JugadorCreateDto {
  @IsNotEmpty()
  @IsNumber()
  numero_camiseta: number;

  @IsNotEmpty()
  nombre_camiseta: string;

  @IsNotEmpty()
  @IsString()
  nombre_completo_jugador: string;

  @IsNotEmpty()
  @IsString()
  poder_especial_dos: string;

  @IsNotEmpty()
  fecha_ingreso_equipo: string;

  @IsNotEmpty()
  goles: number;
}
