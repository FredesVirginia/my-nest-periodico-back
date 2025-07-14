import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';

import { Seccion } from './entity/seccion.entity';
import { CreateArticleDto } from './dto/article.dto';
import { BloqueContenido } from './entity/bloqueContenido';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,

    @InjectRepository(Seccion)
    private seccionRepository: Repository<Seccion>,
  ) {}

  async createArticle(createArticuloDto: CreateArticleDto) {
    try {
      // Crear instancia de artículo
      const article = new Article();
      article.autor = createArticuloDto.autor;
      article.titulo  = createArticuloDto.titulo;
      article.category = createArticuloDto.category;
      article.resumen = createArticuloDto.resumen;
      article.imagen1 = createArticuloDto.imagen1;
      article.imagen2 = createArticuloDto.imagen2;
      article.fechaPublicacion = new Date();

      // Creamos secciones con sus bloques
      article.seccionesTexto = createArticuloDto.secciones.map((seccionDto) => {
        const seccion = new Seccion();
        seccion.subtitulo = seccionDto.subtitulo;

        seccion.bloques = seccionDto.bloques.map((bloqueDto) => {
          const bloque = new BloqueContenido();
          bloque.tipo = bloqueDto.tipo;
          bloque.contenido = bloqueDto.contenido;
          return bloque;
        });

        return seccion;
      });

      const saved = await this.articleRepository.save(article);

      return saved;
    } catch (error) {
      console.log('El error fue ', error);
      throw new BadGatewayException('Error creando el artículo');
    }
  }

  async getArticleById(id: string) {
    try {
      const response = await this.articleRepository.findOne({
        where: { id },
        relations: ['seccionesTexto', 'seccionesTexto.titulo', 'titulos'],
      });

      return response;
    } catch (error) {
      console.log('El error fue', error);
      throw new BadGatewayException('Error al Mostrar Articulos', error);
    }
  }
  async getAllArticles() {
    try {
      const response = await this.articleRepository.find({
        relations: ['seccionesTexto', 'seccionesTexto.bloques'],
      });

      return response;
    } catch (error) {
      console.log('El error fue', error);
      throw new BadGatewayException('Error al Mostrar Articulos', error);
    }
  }
}
