import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    account: string;

    @Column()
    password: string;

    @Column({
        default: false,
    })
    freeze: boolean;

    @Column()
    name: string;

    @ManyToOne(() => RoleEntity, (role) => role.users)
    role: RoleEntity;
}
