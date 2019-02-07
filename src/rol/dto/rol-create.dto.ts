import { IsNotEmpty, IsString } from 'class-validator';

export class RolCreateDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
