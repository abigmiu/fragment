import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TagEntity } from './tag.entity';

@Entity('post')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column()
    title: string;

    @Column({
        type: 'longtext',
    })
    content: string;

    @Column({
        default: false,
    })
    del: boolean;

    @Column({
        default: false,
    })
    freeze: boolean;

    @ManyToMany(() => TagEntity, (tag) => tag.posts)
    tags: TagEntity[];
}
