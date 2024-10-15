import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { MongoIdValidationPipe } from 'src/util/validar.param.util';
import { TokenGuard } from 'src/autenticacion/guards/token.guard';
import { rolEnum } from 'src/enums/rol.enum';
import { RolGuard } from 'src/autenticacion/guards/rol.guard';
import { Roles } from 'src/autenticacion/decorator/roles.decorator';


@UseGuards(TokenGuard, RolGuard)
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}
@Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Post('create')
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }
  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Get('listar')
  findAll() {
    return this.areasService.findAll();
  }
  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Get(':id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.areasService.findOne(id);
  }
  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Patch(':id')
  update(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(id, updateAreaDto);
  }
  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Delete(':id')
  softDelete(@Param('id', MongoIdValidationPipe) id: string) {
    return this.areasService.softDelete(id);
  }
}
