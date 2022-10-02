import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create';
import { ListPostDto } from './dto/list';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('文章')
@ApiBearerAuth()
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get('list')
    @ApiOperation({
        summary: '列表',
    })
    list(@Query() dto: ListPostDto) {
        console.log(typeof dto.lastId);
        return this.postService.list(dto);
    }

    @Post()
    @ApiOperation({
        summary: '新增',
    })
    create(@Body() dto: CreatePostDto) {
        console.log(dto);
        return this.postService.create(dto);
    }
}
