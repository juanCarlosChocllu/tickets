import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { MongoIdValidationPipe } from 'src/util/validar.param.util';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post('create')
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  @Get('listar')
  findAll() {
    return this.areasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',MongoIdValidationPipe) id: string) {
    return this.areasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', MongoIdValidationPipe) id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areasService.update(id, updateAreaDto);
  }

  @Delete(':id')
  softDelete(@Param('id', MongoIdValidationPipe) id: string) {
    return this.areasService.softDelete(id);
  }
}
