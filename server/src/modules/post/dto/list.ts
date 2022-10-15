import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumberString } from 'class-validator';

export class ListPostDto {
    @ApiProperty({
        description: '最新id',
    })
    @IsInt()
    @Type(() => Number)
    lastId: number;

    @ApiProperty({
        description: 'size',
    })
    @IsInt()
    @Type(() => Number)
    size: number;
}

export class PostPageDto {
    @ApiProperty({
        description: 'page',
        default: 1,
    })
    @IsInt()
    @Type(() => Number)
    page: number;

    @ApiProperty({
        description: 'size',
        default: 10,
    })
    @IsInt()
    @Type(() => Number)
    size: number;
}
