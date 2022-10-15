import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
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
        await this.postRepo.save(dto);
    }

    async page(dto: PostPageDto) {
        const res = await this.postRepo.findAndCount({
            where: {
                freeze: false,
            },
            take: dto.size,
            skip: dto.page * dto.size,
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
}
