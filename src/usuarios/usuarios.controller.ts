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
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { MongoIdValidationPipe } from 'src/util/validar.param.util';
import { TokenGuard } from 'src/autenticacion/guards/token.guard';
import { RolGuard } from 'src/autenticacion/guards/rol.guard';
import { Roles } from 'src/autenticacion/decorator/roles.decorator';
import { rolEnum } from 'src/enums/rol.enum';

@UseGuards(TokenGuard, RolGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Post('create')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }
  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Get('listar')
  findAll() {
    return this.usuariosService.findAll();
  }
  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Get(':id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.usuariosService.findOne(id);
  } 


  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Patch(':id')
  update(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Roles([rolEnum.Administrador, rolEnum.AdministradorArea])
  @Delete(':id')
  softDelete(@Param('id', MongoIdValidationPipe) id: string) {
    return this.usuariosService.softDelete(id);
  }
}
