import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Titulo } from './entity/titulo.entity';
import { Seccion } from './entity/seccion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article , Titulo , Seccion])], 
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
