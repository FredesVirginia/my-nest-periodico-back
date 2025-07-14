// seccion-texto.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Article } from './article.entity';

import { Exclude } from 'class-transformer';
import { BloqueContenido } from './bloqueContenido';

@Entity()
export class Seccion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  subtitulo: string;

  @ManyToOne(() => Article, (articulo) => articulo.seccionesTexto, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  articles: Article;

   @OneToMany(() => BloqueContenido, (bloque) => bloque.seccion, {
    cascade: true,
  })
  bloques: BloqueContenido[];

  
}
