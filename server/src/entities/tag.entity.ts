import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column()
    name: string;

    @Column({
        default: false,
    })
    del: boolean;

    @ManyToMany(() => PostEntity, (post) => post.tags)
    @JoinTable()
    posts: PostEntity[];
}
