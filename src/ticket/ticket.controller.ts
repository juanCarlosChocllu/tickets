import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { configuracionMulter } from './util/multer';
import { validarImagenes } from './util/validar.imagenes';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  
  @Post("create")
  @UseInterceptors(FilesInterceptor('files', 3,configuracionMulter))
  create(@UploadedFiles() files: Array<Express.Multer.File>,@Body() createTicketDto:CreateTicketDto) {
    console.log(files);
       
    validarImagenes(files)
    createTicketDto.imagen= files
    return this.ticketService.create(createTicketDto)
  }


  @Get('listar')
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
