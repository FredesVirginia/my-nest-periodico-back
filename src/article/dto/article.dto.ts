// create-articulo.dto.ts
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from 'class-validator';
import { ArticleEnum, TipoBloque } from '../enums/EnumArticle';
import { Type } from 'class-transformer';

export class CreateBloqueDto {
  @IsEnum(TipoBloque)
  tipo: TipoBloque;

  @IsString()
  contenido: string;
}

export class CreateSeccionDto {
  @IsString()
  subtitulo: string;

  @ValidateNested({ each: true })
  @Type(() => CreateBloqueDto)
  bloques: CreateBloqueDto[];
}

export class CreateArticleDto {
  @IsString()
  autor: string;

    @IsString()
  titulo: string;

  @IsString()
  imagen1: string;

  @IsString()
  imagen2: string;

  @IsString()
  resumen: string;

  @IsEnum(ArticleEnum)
  category: ArticleEnum;

  @ValidateNested({ each: true })
  @Type(() => CreateSeccionDto)
  secciones: CreateSeccionDto[];
}

