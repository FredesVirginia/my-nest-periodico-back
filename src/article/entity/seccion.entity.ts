// seccion-texto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Article } from './article.entity';
import { Titulo } from './titulo.entity';
import { Exclude } from 'class-transformer';


@Entity()
export class Seccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  contenido: string;

  @ManyToOne(() => Article, (articulo) => articulo.seccionesTexto, { onDelete: 'CASCADE' })
   @Exclude() 
  articles: Article;

  @OneToMany(()=> Titulo , titulo => titulo.seccion)
  titulo : Titulo[]
}
