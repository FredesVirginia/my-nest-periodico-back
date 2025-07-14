import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';

import { Seccion } from './entity/seccion.entity';
import { BloqueContenido } from './entity/bloqueContenido';

@Module({
    imports: [TypeOrmModule.forFeature([Article , BloqueContenido, Seccion])], 
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
