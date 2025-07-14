import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Seccion } from './seccion.entity';
import { ArticleEnum } from '../enums/EnumArticle';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  autor: string;

  @Column()
  titulo: string;

  @Column()
  imagen1: string;

  @Column()
  imagen2: string;

  @Column()
  fechaPublicacion: Date;

  @Column()
  resumen: string;

  @Column({
    type : 'enum', 
    enum : ArticleEnum,
    default : ArticleEnum.PLANTILLA_3
  })
  category : ArticleEnum



  // Relación uno a muchos con secciones de texto
  @OneToMany(() => Seccion, (seccion) => seccion.articles, { cascade: true })
  seccionesTexto: Seccion[];
}
