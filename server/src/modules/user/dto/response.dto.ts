import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { RoleEntity } from 'src/entities/role.entity';
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

    @ApiProperty({
        description: '权限 id',
        type: 'integer',
        isArray: true,
    })
    authIds: number[];

    @ApiProperty({
        description: '角色名称',
    })
    roleName: string;
}
