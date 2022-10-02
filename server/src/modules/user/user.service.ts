import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/user.entity';
import { IJwtData } from 'src/types/user';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { ILoginResponse } from './dto/response.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepo: Repository<RoleEntity>,
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

        const response = new ILoginResponse(res);
        response.token = token;
        response.roleName = res.role.name;
        const role = await this.roleRepo.findOne({
            where: {
                id: res.role.id,
            },
            relations: ['auths'],
        });
        response.authIds = role.auths.map((auth) => auth.id);

        return response;
    }
}
