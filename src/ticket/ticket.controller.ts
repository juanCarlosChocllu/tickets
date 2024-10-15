import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { configuracionMulter } from './util/multer';
import { validarImagenes } from './util/validar.imagenes';
import { Types } from 'mongoose';
import { MongoIdValidationPipe } from 'src/util/validar.param.util';
import { TokenGuard } from 'src/autenticacion/guards/token.guard';
import { payloadI } from 'src/autenticacion/interface/payload.interface';
import { types } from 'util';
import { Roles } from 'src/autenticacion/decorator/roles.decorator';
import { rolEnum } from 'src/enums/rol.enum';
import { RolGuard } from 'src/autenticacion/guards/rol.guard';
@UseGuards(TokenGuard, RolGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}


  @Post('create')
  @Roles([rolEnum.Administrador, rolEnum.Usuario])
  @UseInterceptors(FilesInterceptor('files', 2, configuracionMulter))
  create(
    @Req() request: Express.Application,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    validarImagenes(files);
    const user: payloadI = request['user'];
    createTicketDto.imagen = files;
    createTicketDto.area = new Types.ObjectId(createTicketDto.area);
    createTicketDto.usuario = new Types.ObjectId(user.id);
    createTicketDto.sucursal = new Types.ObjectId(user.sucursal);
    return this.ticketService.create(createTicketDto);
  }

  @Get('listar')
  @Roles([rolEnum.Administrador, rolEnum.Usuario])
  findAll(@Req() request: Express.Application) {
    const user: payloadI = request['user'];    
    return this.ticketService.findAll(user);
  }

  @Get('listar/area')
  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  listarTicketArea(@Req() request: Express.Application) {
    const user: payloadI = request['user'];
    return this.ticketService.listarTicketArea(user);
  }

  @Get(':id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.ticketService.findOne(id);
  }
  @Roles([rolEnum.Administrador, rolEnum.Usuario])
  @Patch('actualizar/:id')
  @UseInterceptors(FilesInterceptor('files', 2, configuracionMulter))
  update(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    if (
      files &&
      files.length > 0 &&
      updateTicketDto.idImagenes &&
      updateTicketDto.idImagenes.length > 0
    ) {
      validarImagenes(files);
      updateTicketDto.imagen = files;
    }
    if (typeof updateTicketDto.idImagenes === 'string') {
      updateTicketDto.idImagenes = JSON.parse(updateTicketDto.idImagenes).map(
        (id: string) => id,
      );
    }
    return this.ticketService.update(id, updateTicketDto);
  }
  @Roles([rolEnum.Administrador, rolEnum.Usuario])
  @Delete('delete/:id')
  softDelete(@Param('id', MongoIdValidationPipe) id: string) {
    return this.ticketService.softDelete(id);
  }

  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @UseInterceptors(FilesInterceptor('files', 2, configuracionMulter))
  @Post('imagen/reparada/:id')
  subirImagenReparada(@Param('id', MongoIdValidationPipe) id: string ,     @UploadedFiles() files: Array<Express.Multer.File>,){
    validarImagenes(files);
   

    return this.ticketService.subirImagenReparada(id, files)
  }

}
