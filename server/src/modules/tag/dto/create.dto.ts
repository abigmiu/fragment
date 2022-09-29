import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
    @ApiProperty({
        description: '名字',
    })
    @IsString()
    name: string;
}
