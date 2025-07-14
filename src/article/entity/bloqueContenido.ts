import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seccion } from "./seccion.entity";
import { TipoBloque } from "../enums/EnumArticle";



@Entity()
export class BloqueContenido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TipoBloque,
  })
  tipo: TipoBloque;

  @Column('text')
  contenido: string; // puede ser texto, lista (en formato JSON o separado por `\n`), o URL de imagen

  @ManyToOne(() => Seccion, (seccion) => seccion.bloques, {
    onDelete: 'CASCADE',
  })
  seccion: Seccion;
}
