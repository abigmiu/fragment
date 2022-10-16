import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParamDto } from 'src/common/dto/common.dto';
import { CreatePostDto } from './dto/create';
import { ListPostDto, PostPageDto } from './dto/list';
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

    @Get('page')
    @ApiOperation({
        summary: '分页',
    })
    page(@Query() dto: PostPageDto) {
        return this.postService.page(dto);
    }

    @Post()
    @ApiOperation({
        summary: '新增',
    })
    create(@Body() dto: CreatePostDto) {
        console.log(dto);
        return this.postService.create(dto);
    }

    @Get(':id')
    @ApiOperation({
        summary: '详情',
    })
    detail(@Param() param: IdParamDto) {
        return this.postService.detail(param.id);
    }

    @Put(':id')
    @ApiOperation({
        summary: '更新',
    })
    update(@Param() param: IdParamDto, @Body() dto: CreatePostDto) {
        return this.postService.update(param.id, dto);
    }
}
