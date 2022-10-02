import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';

export class ILoginResponse extends UserEntity {
    constructor(options: Partial<UserEntity> = {}) {
        super();
        Object.assign(this, options);
    }

    @ApiProperty({
        description: 'token',
    })
    token: string;
}
