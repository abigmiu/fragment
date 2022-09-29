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
