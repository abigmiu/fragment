import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('文章')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get('list')
    @ApiOperation({
        summary: '列表',
    })
    list() {
        return '123';
    }

    @Post()
    @ApiOperation({
        summary: '新增',
    })
    create(@Body() dto: CreatePostDto) {
        return this.postService.create(dto);
    }
}
