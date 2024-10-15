import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './schema/usuario.schema';
import { SucursalModule } from 'src/sucursal/sucursal.module';
import { AreasModule } from 'src/areas/areas.module';

@Module({
  imports: [
    forwardRef(()=>SucursalModule),
    AreasModule,
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
