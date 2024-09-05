import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../constants/rol.constants';
import { rolEnum } from 'src/enums/rol.enum';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AutenticacionService } from '../autenticacion.service';
import { log } from 'node:console';
import { payloadI } from '../interface/payload.interface';

@Injectable()
export class RolGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usuarioService: UsuariosService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<rolEnum[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user: payloadI = request.user;
    const usuario = await this.usuarioService.findOne(`${user.id}`);
    if (roles == undefined || roles.length < 1)
      throw new UnauthorizedException();
    return roles.some((rol) => usuario.rol.includes(rol));
  }
}
