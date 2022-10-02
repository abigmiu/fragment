import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('auth')
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    summary: string;

    @ManyToMany(() => RoleEntity, (role) => role.auths)
    @JoinTable()
    roles: RoleEntity[];
}
