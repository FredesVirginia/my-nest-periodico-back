import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Titulo } from './titulo.entity';
import { Seccion } from './seccion.entity';
import { ArticleEnum } from '../enums/EnumArticle';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  autor: string;

  @Column()
  fechaPublicacion: Date;

  @Column()
  resumen: string;

  @Column({
    type : 'enum', 
    enum : ArticleEnum,
    default : ArticleEnum.TEGNOLOGY
  })
  category : ArticleEnum

  // Relación uno a muchos con títulos
  @OneToMany(() => Titulo, (titulo) => titulo.articles, { cascade: true })
  titulos: Titulo[];

  // Relación uno a muchos con secciones de texto
  @OneToMany(() => Seccion, (seccion) => seccion.articles, { cascade: true })
  seccionesTexto: Seccion[];
}
