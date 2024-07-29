import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionDto } from './dto/autenticacion.dto';


@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post()
  login(@Body() autenticacionDto: AutenticacionDto) {
    console.log(autenticacionDto);
    
    return this.autenticacionService.login(autenticacionDto);
  }
  
}
