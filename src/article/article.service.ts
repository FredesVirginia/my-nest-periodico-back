import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';
import { Titulo } from './entity/titulo.entity';
import { Seccion } from './entity/seccion.entity';
import { CreateArticleDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Titulo)
    private tituloRepository: Repository<Titulo>,
    @InjectRepository(Seccion)
    private seccionRepository: Repository<Seccion>,
  ) {}

  async createArticle(createArticuloDto: CreateArticleDto): Promise<Article> {
    try {
      // Crear instancia de artículo
      const article = new Article();
      article.autor = createArticuloDto.autor;
      article.resumen = createArticuloDto.resumen;
      article.fechaPublicacion = new Date();

      // Primero creamos las secciones y las asignamos al artículo
      article.seccionesTexto = createArticuloDto.secciones.map((s) => {
        const seccion = new Seccion();
        seccion.contenido = s.contenido;
        seccion.articles = article; // relación inversa
        return seccion;
      });

      // Guardamos el artículo con secciones para que tengan ID y puedan ser referenciadas
      // Esto es importante para poder asignar seccionId a los títulos
      const savedArticle = await this.articleRepository.save(article);

      // Ahora creamos los títulos, asignando la sección correspondiente si existe
      savedArticle.titulos = createArticuloDto.titulos.map((t) => {
        const titulo = new Titulo();
        titulo.texto = t.texto;
        titulo.nivel = t.nivel!;

        // Si el título tiene seccionIndex, asignamos la sección correspondiente
        if (t.seccionIndex !== null && t.seccionIndex !== undefined) {
          titulo.seccion = savedArticle.seccionesTexto[t.seccionIndex];
        } else {
          titulo.seccion = null; // título sin sección asociada
        }

        titulo.articles = savedArticle; // relación con artículo
        return titulo;
      });

      // Guardamos los títulos relacionados
      await this.tituloRepository.save(savedArticle.titulos);

      // Finalmente devolvemos el artículo completo con relaciones
      const articleNew = await this.articleRepository.findOne({
        where: { id: savedArticle.id },
       relations: ['seccionesTexto', 'titulos' , 'titulos.seccion'],
      });

      if (!articleNew) {
        throw new NotFoundException('Artículo no encontrado');
      }

      return articleNew;
    } catch (error) {
      console.log("El error fue " , error)
      throw new BadGatewayException('Error creando el artículo');
    }
  }
}
