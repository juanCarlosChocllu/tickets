import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schema/usuario.schema';
import { Model } from 'mongoose';
import *  as bcrypt from 'bcrypt'  
import { Flag } from 'src/enums/enum.flag';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly UsuarioSchema:Model<Usuario>
   ){}
  async create(createUsuarioDto: CreateUsuarioDto) {
    createUsuarioDto.contrasena = await bcrypt.hash(createUsuarioDto.contrasena, 10)
    await this.UsuarioSchema.create(createUsuarioDto)
    return  {status:HttpStatus.CREATED } ;
  } async findAll() {
  const usuarios:Usuario[] =await this.UsuarioSchema.find({flag:Flag.nuevo}).select('-contrasena') ;
  return usuarios
  }


  async buscarUsuario(user:string){
    const usuario =await  this.UsuarioSchema.findOne({usuario:user, flag:Flag.nuevo})
    if(!usuario){
      throw new NotFoundException('No se encontro el usuario')
    }
    return usuario
   }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
