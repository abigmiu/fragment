import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class RBACAuthGuard extends AuthGuard('jwt') {
    constructor(
        private authService: AuthService,
        private reflector: Reflector,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<any> {
        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler(),
        );
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        await this.authService.validate(token);

        return super.canActivate(context);
    }
}
