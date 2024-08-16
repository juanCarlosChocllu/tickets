import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { configuracionMulter } from './util/multer';
import { validarImagenes } from './util/validar.imagenes';
import { Types } from 'mongoose';
import { MongoIdValidationPipe } from 'src/util/validar.param.util';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  
  @Post("create")
  @UseInterceptors(FilesInterceptor('files', 3,configuracionMulter))
  create(@UploadedFiles() files: Array<Express.Multer.File>,@Body() createTicketDto:CreateTicketDto) {    
    validarImagenes(files)
    createTicketDto.imagen= files
    return this.ticketService.create(createTicketDto)
  }


  @Get('listar')
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',MongoIdValidationPipe) id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch('actualizar/:id')
  @UseInterceptors(FilesInterceptor('files', 3,configuracionMulter))
  update(@UploadedFiles() files : Array<Express.Multer.File>,@Param('id', MongoIdValidationPipe)id: string, @Body() updateTicketDto: UpdateTicketDto) {
      if(files && files.length > 0 && updateTicketDto.idImagenes && updateTicketDto.idImagenes.length > 0){
        validarImagenes(files)
        updateTicketDto.imagen = files
      }
      if (typeof updateTicketDto.idImagenes === 'string') {
        updateTicketDto.idImagenes = JSON.parse(updateTicketDto.idImagenes).map((id: string) => id);
      }
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete('delete/:id')
  softDelete(@Param('id', MongoIdValidationPipe) id: string) {
    return this.ticketService.softDelete(id);
  }
}
