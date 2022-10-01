import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { IdParamDto } from 'src/common/dto/common.dto';
import { ITagListItem } from 'src/types/tag';
import { CreateTagDto } from './dto/create.dto';
import { UpdateTagDto } from './dto/update.dto';
import { TagService } from './tag.service';

@Controller('tag')
@ApiTags('标签')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    @ApiOperation({
        summary: '创建',
    })
    create(@Body() dto: CreateTagDto) {
        return this.tagService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({
        summary: '更新',
    })
    update(@Body() dto: UpdateTagDto, @Param() param: IdParamDto) {
        return this.tagService.update(param.id, dto);
    }

    @Get()
    @ApiOperation({
        summary: '列表',
    })
    @ApiOkResponse({
        type: ITagListItem,
        isArray: true,
    })
    list() {
        return this.tagService.list();
    }
}
