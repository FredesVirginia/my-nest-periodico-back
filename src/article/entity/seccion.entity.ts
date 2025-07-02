// seccion-texto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Article } from './article.entity';


@Entity()
export class Seccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  contenido: string;

  @ManyToOne(() => Article, (articulo) => articulo.seccionesTexto, { onDelete: 'CASCADE' })
  articles: Article;
}
