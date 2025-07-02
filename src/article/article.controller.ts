import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticuloDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {

    constructor ( private readonly articleService : ArticleService){}


    @Post()
    async createArticle(@Body() data : CreateArticuloDto){
        return this.articleService.createArticle(data)

    }
}
