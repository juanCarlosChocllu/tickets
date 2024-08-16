import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schema/usuario.schema';
import { Model, Types } from 'mongoose';
import *  as bcrypt from 'bcrypt'  
import { Flag } from 'src/enums/enum.flag';
import { Type } from 'class-transformer';
import { MongoIdValidationPipe } from 'src/util/validar.param.util';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly UsuarioSchema:Model<Usuario>
   ){}
  async create(createUsuarioDto: CreateUsuarioDto) {
    createUsuarioDto.sucursal= new Types.ObjectId(createUsuarioDto.sucursal)
    createUsuarioDto.area = new Types.ObjectId(createUsuarioDto.area)
    createUsuarioDto.contrasena = await bcrypt.hash(createUsuarioDto.contrasena, 10)
    await this.UsuarioSchema.create(createUsuarioDto)
    return  {status:HttpStatus.CREATED } ;
  } 
  
  
  
  
  async findAll() {
  const usuarios:Usuario[] =await this.UsuarioSchema.find({flag:Flag.nuevo}).select('-contrasena') ;
  return usuarios
  }


  async buscarUsuario(user:string){
    const usuario =await  this.UsuarioSchema.findOne({usuario:user, flag:Flag.nuevo}).exec()
    if(!usuario){
      throw new NotFoundException('No se encontro el usuario')
    }
    return usuario
   }

  async findOne(id: string) {  
    const usuario = await this.validarUsuario(id)
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    updateUsuarioDto.contrasena = await bcrypt.hash(updateUsuarioDto.contrasena, 10)
   await this.validarUsuario(id) 
    await this.UsuarioSchema.findByIdAndUpdate(id, updateUsuarioDto,{new:true})
    return {status:HttpStatus.OK};
  }

 async  softDelete(id: string) {
   await this.validarUsuario(id)
   await this.UsuarioSchema.findByIdAndUpdate(id,{flag:Flag.eliminado})
    return {status:HttpStatus.OK};
  }

  private async validarUsuario(id:string){
    const usuario = await this.UsuarioSchema.findOne({_id:id}).exec()
    if(!usuario){
      throw new NotFoundException('No se encontro el usuario')
    }
    return usuario

  }
}
