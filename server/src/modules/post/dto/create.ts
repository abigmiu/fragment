import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumberString, IsString } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({
        description: '标题',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: '内容 markdown',
    })
    @IsString()
    content: string;

    @ApiProperty({
        description: '标签Ids',
        isArray: true,
        type: 'integer',
    })
    tagIds: number[];
}
