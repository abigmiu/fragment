import { ApiProperty } from '@nestjs/swagger';

export class ITagListItem {
    @ApiProperty({
        description: 'id',
    })
    id: number;

    @ApiProperty({
        description: '名称',
    })
    name: string;
}
