import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromRequest(request);

    if (!token)
      throw new UnauthorizedException('Token no valido para consumir recurso');

    const valid = this.jwtService.verify<User>(token);

    if (!valid) throw new UnauthorizedException('Token no valido ');

    if (valid.userId != request.params['id'])
      throw new UnauthorizedException('Usuario invalido');

    return true;
  }

  extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    console.log(request.headers['Authorization']);
    return type == 'Bearer' ? token : null;
  }
}
