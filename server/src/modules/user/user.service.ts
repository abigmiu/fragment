import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { IJwtData } from 'src/types/user';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        private readonly authService: AuthService,
    ) {}

    async adminLogin(dto: LoginDto) {
        const res = await this.userRepo.findOne({
            where: {
                freeze: false,
                account: dto.account,
                password: dto.password,
            },
            relations: ['role'],
        });

        if (!res) throw new BadRequestException('账号密码错误');

        const data: IJwtData = {
            userId: res.id,
            roleId: res.role.id,
        };

        const token = this.authService.createToken(data);
        return token;
    }
}
