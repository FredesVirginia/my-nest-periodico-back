import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/article.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('article')
export class ArticleController {

    constructor ( private readonly articleService : ArticleService){}


    @Post()
    async createArticle(@Body() data : CreateArticleDto){
        return this.articleService.createArticle(data)

    }
}
