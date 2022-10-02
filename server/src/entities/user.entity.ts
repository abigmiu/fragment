import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
    @ApiProperty({
        description: 'id',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: '账号',
    })
    @Column()
    account: string;

    @Column()
    @Exclude()
    password: string;

    @Column({
        default: false,
    })
    @Exclude()
    freeze: boolean;

    @ApiProperty({
        description: '昵称',
    })
    @Column()
    name: string;

    @Exclude()
    @ManyToOne(() => RoleEntity, (role) => role.users)
    role: RoleEntity;
}
