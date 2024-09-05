import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { Observable } from "rxjs";
import { ROLES_KEY } from "../constants/rol.constants";
import { rolEnum } from "src/enums/rol.enum";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { AutenticacionService } from "../autenticacion.service";
import { log } from "node:console";



@Injectable()
export class RolGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    	
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
           const roles = this.reflector.get<rolEnum[]>(ROLES_KEY, context.getHandler())
           const request = context.switchToHttp().getRequest()


      
            if(roles == undefined || roles.length < 1) throw new UnauthorizedException()
            


        return true
    }

}