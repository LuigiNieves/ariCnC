import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromRequest(request);
    if (!token)
      throw new UnauthorizedException('Token no valido para consumir recurso');

    return !!this.jwtService.verify<User>(token);
  }

  extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type == 'Bearer' ? token : null;
  }
}
