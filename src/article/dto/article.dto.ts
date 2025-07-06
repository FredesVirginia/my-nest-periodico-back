// create-articulo.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateTitleDto {
  @IsString()
  @IsNotEmpty()
  texto: string;
  @IsNumber()
  @IsNotEmpty()
  nivel: number;
  @IsNumber()
  @IsNotEmpty()
  seccionIndex?: number; // índice de la sección a la que pertenece, o null si es suelto
}

class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  contenido: string;
}

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  autor: string;
  @IsString()
  @IsNotEmpty()
  resumen: string;
  @IsString()
  @IsNotEmpty()
  imagen1: string;
  @IsString()
  @IsNotEmpty()
  imagen2: string;
  @IsArray()
  @IsNotEmpty()
  secciones: CreateSectionDto[];
  @IsArray()
  @IsNotEmpty()
  titulos: CreateTitleDto[];
}
