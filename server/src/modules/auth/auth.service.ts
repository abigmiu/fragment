import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { jwtSecret, redisPrefix } from 'src/constant/config';
import { IJwtData } from 'src/types/user';

@Injectable()
export class AuthService {
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private readonly jwtService: JwtService,
    ) {}

    createToken(data: IJwtData) {
        const token = this.jwtService.sign(data);
        this.redis.hset(`${redisPrefix}:token`, token, 1);
        return token;
    }

    /** 验证 token */
    async validate(token?: string) {
        if (!token) throw new UnauthorizedException();
        const exit = await this.redis.hexists(`${redisPrefix}:token`, token);
        if (!exit) throw new UnauthorizedException();

        try {
            this.jwtService.verify(token, {
                secret: jwtSecret,
            });
        } catch (e) {
            this.redis.hdel(`${redisPrefix}:token`, token);
            throw new UnauthorizedException();
        }
    }
}
