import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.entity";
import { Seccion } from "./seccion.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Titulo{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    texto : string ; 


    @Column({nullable : true})
    nivel : number;

  
    @ManyToOne(() => Seccion, seccion => seccion.titulo, { nullable: true, onDelete: 'SET NULL' })
    seccion: Seccion | null;

    @ManyToOne(()=>Article , (article) => article.titulos , { onDelete : "CASCADE"})
     @Exclude() 
    articles : Article
}