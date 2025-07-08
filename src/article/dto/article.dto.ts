// create-articulo.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArticleEnum } from '../enums/EnumArticle';

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
  @IsEnum(ArticleEnum)
  @IsNotEmpty()
  category : ArticleEnum
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
