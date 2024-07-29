import { ForbiddenException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AutenticacionDto } from './dto/autenticacion.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacionService {
  constructor(
    private readonly UsuarioService:UsuariosService,
    private readonly  jwtService: JwtService
  ){}
  
  async login(autenticacionDto: AutenticacionDto) {
    const usuario =await this.UsuarioService.buscarUsuario(autenticacionDto.usuario)
    if(usuario){
        const contrasena = await bcrypt.compare(autenticacionDto.contrasena, usuario.contrasena)
        if(contrasena){ 
            const payload = { id: usuario._id};
           const token = await this.jwtService.signAsync(payload)
            return { status:HttpStatus.OK, token}
        }else{
          throw new UnauthorizedException('Contarsena invalida')
           
        }
        
    }
  }
}
