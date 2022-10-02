import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('admin')
    @Public()
    @ApiOperation({
        summary: '登录',
    })
    adminLogin(@Body() dto: LoginDto) {
        return this.userService.adminLogin(dto);
    }
}
