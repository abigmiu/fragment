import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthEntity } from './auth.entity';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    summary: string;

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[];

    @ManyToMany(() => AuthEntity, (auth) => auth.roles)
    auths: AuthEntity[];
}
