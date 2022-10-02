import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RBACAuthGuard } from './modules/auth/auth.guard';
import modules from './modules/index';

@Module({
    imports: [
        ...modules,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456789',
            database: 'fragment',
            entities: [path.join(__dirname, './entities/**/*.entity{.js,.ts}')],
            synchronize: true,
        }),
        RedisModule.forRoot({
            config: {
                host: 'localhost',
                port: 6379,
            },
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        JwtService,
        {
            provide: APP_GUARD,
            useClass: RBACAuthGuard,
        },
    ],
})
export class AppModule {}
