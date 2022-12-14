import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { redisPrefix } from 'src/constant/config';
import { TagEntity } from 'src/entities/tag.entity';
import { ITagListItem } from 'src/types/tag';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create.dto';
import { UpdateTagDto } from './dto/update.dto';

@Injectable()
export class TagService {
    constructor(
        @InjectRedis()
        private readonly redis: Redis,
        @InjectRepository(TagEntity)
        private readonly tagRepo: Repository<TagEntity>,
    ) {}

    private async synchronize() {
        const repoData = await this.tagRepo.find({
            where: {
                del: false,
            },
        });

        this.redis.del(`${redisPrefix}:tags`);

        const data: ITagListItem[] = repoData.map((item) => ({
            id: item.id,
            name: item.name,
        }));

        await this.redis.lpush(`${redisPrefix}:tags`, JSON.stringify(data));
    }

    async list() {
        const data = await this.redis.lrange(`${redisPrefix}:tags`, 0, 0);

        try {
            const res: ITagListItem[] = JSON.parse(data[0]);
            return res;
        } catch {
            return [];
        }
    }

    async create(dto: CreateTagDto) {
        console.log(dto);
        await this.tagRepo.save(dto);
        this.synchronize();
    }

    async update(id: number, dto: UpdateTagDto) {
        const tag = new TagEntity();
        tag.id = id;
        tag.name = dto.name;
        await this.tagRepo.save(tag);
        this.synchronize();
    }
}
