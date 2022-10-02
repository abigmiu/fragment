import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: '账号',
        default: 'admin',
    })
    @IsString()
    @IsNotEmpty()
    account: string;

    @ApiProperty({
        description: '密码',
        default: '123456',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
