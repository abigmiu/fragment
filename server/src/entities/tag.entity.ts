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

@Entity({
    name: 'tag',
})
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
    freeze: boolean;

    @ManyToMany(() => PostEntity, (post) => post.tags)
    @JoinTable()
    posts: PostEntity[];
}
