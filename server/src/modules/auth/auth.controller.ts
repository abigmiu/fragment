import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @Public()
    test() {
        return this.authService.createToken({
            roleId: 1,
            userId: 1,
        });
    }

    @Get(':token')
    validate(@Param('token') token: string) {
        return this.authService.validate(token);
    }
}
