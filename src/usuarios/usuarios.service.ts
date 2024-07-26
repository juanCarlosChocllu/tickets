import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schema/usuario.schema';
import { Model } from 'mongoose';
import *  as bcrypt from 'bcrypt'  

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly UsuarioSchema:Model<Usuario>
   ){}
  async create(createUsuarioDto: CreateUsuarioDto) {
    createUsuarioDto.contrasena = await bcrypt.hash(createUsuarioDto.contrasena, 10)
    await this.UsuarioSchema.create(createUsuarioDto)
    return  {status:HttpStatus.CREATED } ;
  }

  findAll() {
    return `This action returns all usuarios`;
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
