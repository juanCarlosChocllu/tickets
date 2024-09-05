import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt.constants';
import { payloadI } from '../interface/payload.interface';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const autenticacionHeader: string = request.headers.authorization;
    try {
      const token = autenticacionHeader.split(' ')[1];
      const user: payloadI = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
