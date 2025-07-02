// create-articulo.dto.ts
import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateTituloDto {
  @IsString()
  @IsNotEmpty()
  texto: string;
}

class CreateSeccionTextoDto {
  @IsString()
  @IsNotEmpty()
  contenido: string;
}

export class CreateArticuloDto {
  @IsString()
  @IsNotEmpty()
  autor: string;

  @IsString()
  @IsNotEmpty()
  resumen: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTituloDto)
  titulos: CreateTituloDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSeccionTextoDto)
  seccionesTexto: CreateSeccionTextoDto[];
}
