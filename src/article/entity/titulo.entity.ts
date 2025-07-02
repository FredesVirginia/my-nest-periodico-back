import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.entity";

@Entity()
export class Titulo{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    texto : string ; 


    @ManyToOne(()=>Article , (article) => article.titulos , { onDelete : "CASCADE"})
    articles : Article
}