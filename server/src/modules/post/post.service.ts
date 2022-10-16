import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { TagEntity } from 'src/entities/tag.entity';
import { IPageResponse } from 'src/types/page';
import { LessThan, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create';
import { ListPostDto, PostPageDto } from './dto/list';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepo: Repository<PostEntity>,
    ) {}

    async create(dto: CreatePostDto) {
        const post = new PostEntity();
        post.content = dto.content;
        post.title = dto.title;
        post.tags = dto.tagIds.map((tagId) => {
            const tag = new TagEntity();
            tag.id = tagId;
            return tag;
        });
        await this.postRepo.save(post);
    }

    async page(dto: PostPageDto) {
        const res = await this.postRepo.findAndCount({
            where: {
                freeze: false,
            },
            take: dto.size,
            skip: (dto.page - 1) * dto.size,
        });

        const response: IPageResponse = {
            content: res[0],
            total: res[1],
        };

        return response;
    }

    async list(dto: ListPostDto) {
        let res: [PostEntity[], number] = [[], 0];
        dto.lastId = dto.lastId;
        if (dto.lastId) {
            res = await this.postRepo.findAndCount({
                where: {
                    freeze: false,
                    id: LessThan(dto.lastId),
                },
                take: dto.size,
                order: {
                    id: 'DESC',
                },
            });
        } else {
            res = await this.postRepo.findAndCount({
                where: {
                    freeze: false,
                },
                take: dto.size,
                order: {
                    id: 'DESC',
                },
            });
        }
        const response: IPageResponse = {
            content: res[0],
            total: res[1],
        };
        return response;
    }

    async random() {
        // TODO:
    }

    async detail(id: number) {
        const res = await this.postRepo.findOne({
            where: {
                id: id,
            },
            relations: ['tags'],
        });

        const response = {
            ...res,
            tagIds: res.tags.map((tag) => tag.id),
        };

        return response;
    }

    async update(id: number, dto: CreatePostDto) {
        const post = new PostEntity();
        post.id = id;
        post.content = dto.content;
        post.title = dto.title;
        post.tags = dto.tagIds.map((tagId) => {
            const tag = new TagEntity();
            tag.id = tagId;
            return tag;
        });
        await this.postRepo.save(post);
    }
}
