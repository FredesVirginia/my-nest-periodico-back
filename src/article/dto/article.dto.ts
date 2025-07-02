// create-articulo.dto.ts
import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateTitleDto {
  texto: string;
  nivel?: number;
  seccionIndex?: number; // índice de la sección a la que pertenece, o null si es suelto
}

class CreateSectionDto {
  contenido: string;
}

export class CreateArticleDto {
  autor: string;
  resumen: string;
  secciones: CreateSectionDto[];
  titulos: CreateTitleDto[];
}

