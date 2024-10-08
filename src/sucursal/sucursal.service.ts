import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sucursal } from './schema/sucursal.schema';
import { Model } from 'mongoose';
import { Flag } from 'src/enums/enum.flag';
import { constants } from 'buffer';

@Injectable()
export class SucursalService {
  constructor(
    @InjectModel(Sucursal.name)
    private readonly SucursalSchema: Model<Sucursal>,
  ) {}
  async create(createSucursalDto: CreateSucursalDto) {
    const sucursal = await this.SucursalSchema.findOne({
      nombre: createSucursalDto.nombre,
      flag: Flag.nuevo,
    }).exec();
    if (sucursal) {
      throw new ConflictException('Ya existe la sucursal');
    }
    this.SucursalSchema.create(createSucursalDto);
    return { status: HttpStatus.CREATED };
  }

  findAll() {
    return this.SucursalSchema.find({ flag: Flag.nuevo }).select('nombre');
  }

  async findOne(id: string) {
    const sucursal = await this.validarSucursal(id);
    return sucursal;
  }

  update(id: number, updateSucursalDto: UpdateSucursalDto) {
    return `This action updates a #${id} sucursal`;
  }

  remove(id: number) {
    return `This action removes a #${id} sucursal`;
  }

  public async validarSucursal(id: string) {
    const sucursal = await this.SucursalSchema.findOne({
      _id: id,
      flag: Flag.nuevo,
    });
    if (!sucursal) {
      throw new NotFoundException('No se encontro la sucursal');
    }
    return sucursal;
  }
}
