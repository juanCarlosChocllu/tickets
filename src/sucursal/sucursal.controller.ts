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
import { SucursalService } from './sucursal.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { rolEnum } from 'src/enums/rol.enum';
import { TokenGuard } from 'src/autenticacion/guards/token.guard';
import { RolGuard } from 'src/autenticacion/guards/rol.guard';
import { Roles } from 'src/autenticacion/decorator/roles.decorator';


@UseGuards(TokenGuard, RolGuard)
@Controller('sucursal')
export class SucursalController {
  constructor(private readonly sucursalService: SucursalService) {}

  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Post('create')
  create(@Body() createSucursalDto: CreateSucursalDto) {
    return this.sucursalService.create(createSucursalDto);
  }

  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Get('listar')
  findAll() {
    return this.sucursalService.findAll();
  }

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sucursalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSucursalDto: UpdateSucursalDto) {
    return this.sucursalService.update(+id, updateSucursalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sucursalService.remove(+id);
  }*/
}
