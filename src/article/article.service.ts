import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';
import { Titulo } from './entity/titulo.entity';
import { Seccion } from './entity/seccion.entity';
import { CreateArticuloDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository : Repository<Article>,
         @InjectRepository(Titulo)
        private tituloRepository : Repository<Titulo>,
         @InjectRepository(Seccion)
        private seccionRepository : Repository<Seccion>
    ){}

   async createArticle(createArticuloDto: CreateArticuloDto): Promise<Article> {
    try {
      // Crear instancia de artículo
      const article = new Article();
      article.autor = createArticuloDto.autor;
      article.fechaPublicacion = new Date();
      article.resumen = createArticuloDto.resumen;

      // Mapear títulos y secciones desde el DTO
      article.titulos = createArticuloDto.titulos.map(t => {
        const titulo = new Titulo();
        titulo.texto = t.texto;
        return titulo;
      });

      article.seccionesTexto = createArticuloDto.seccionesTexto.map(s => {
        const seccion = new Seccion();
        seccion.contenido = s.contenido;
        return seccion;
      });

      // Guardar artículo junto con títulos y secciones (gracias a cascade)
      return await this.articleRepository.save(article);
    } catch (error) {
      throw new BadGatewayException('Error creando el artículo');
    }
  }
}
