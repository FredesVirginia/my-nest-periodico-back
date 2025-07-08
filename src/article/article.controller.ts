import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/article.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async createArticle(@Body() data: CreateArticleDto) {
    return this.articleService.createArticle(data);
  }

 

  @Get()
  async getAllArticle() {
    return this.articleService.getAllArticles();
  }

   @Get(':id')
  async getArticleById(@Param('id') id: string) {
     console.log('getArticleById llamado con id:', id);
    return this.articleService.getArticleById(id);
  }
}
