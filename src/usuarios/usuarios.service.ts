import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schema/usuario.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Flag } from 'src/enums/enum.flag';
import { AreasService } from 'src/areas/areas.service';
import { SucursalService } from 'src/sucursal/sucursal.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly UsuarioSchema: Model<Usuario>,
    private readonly areaService:AreasService,
    private readonly sucursalService:SucursalService
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const area = await this.areaService.validarArea(`${createUsuarioDto.area}`)
    const sucursal = await this.sucursalService.validarSucursal(`${createUsuarioDto.sucursal}`)
    createUsuarioDto.sucursal = new Types.ObjectId(sucursal._id);
    createUsuarioDto.area = new Types.ObjectId(area._id);
    const userExiste = await this.UsuarioSchema.findOne({
      usuario: createUsuarioDto.usuario,
      flag: Flag.nuevo,
    }).exec();
    
    if (userExiste) {
      throw new ConflictException('El usuario ya existe');
    }
    createUsuarioDto.contrasena = await bcrypt.hash(
      createUsuarioDto.contrasena,
      10,
    );
    await this.UsuarioSchema.create(createUsuarioDto);
    return { status: HttpStatus.CREATED };
  }

  async findAll() {
    const usuarios: Usuario[] = await this.UsuarioSchema.find({
      flag: Flag.nuevo,
    }).select('-contrasena');
    return usuarios;
  }

  async buscarUsuario(user: string) {
    const usuario = await this.UsuarioSchema.findOne({
      usuario: user,
      flag: Flag.nuevo,
    }).exec();
    if (!usuario) {
      throw new NotFoundException('No se encontro el usuario');
    }
    return usuario;
  }

  async findOne(id: string) {
    const usuario = await this.validarUsuario(id);
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    updateUsuarioDto.contrasena = await bcrypt.hash(
      updateUsuarioDto.contrasena,
      10,
    );
    await this.validarUsuario(id);
    await this.UsuarioSchema.findByIdAndUpdate(id, updateUsuarioDto, {
      new: true,
    });
    return { status: HttpStatus.OK };
  }

  async softDelete(id: string) {
    await this.validarUsuario(id);
    await this.UsuarioSchema.findByIdAndUpdate(id, { flag: Flag.eliminado });
    return { status: HttpStatus.OK };
  }

  private async validarUsuario(id: string) {
    const usuario = await this.UsuarioSchema.findOne({
      _id: id,
      flag: Flag.nuevo,
    }).exec();
    if (!usuario) {
      throw new NotFoundException('No se encontro el usuario');
    }
    return usuario;
  }
}
