import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt } from 'class-validator';

export class IdParamDto {
    @ApiProperty({
        description: 'id',
    })
    @IsInt()
    @Type(() => Number)
    id: number;
}
