import { forwardRef, Module } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { SucursalController } from './sucursal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sucursal, SucursalSchema } from './schema/sucursal.schema';

import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sucursal.name, schema: SucursalSchema },
    ]),
    forwardRef(()=>UsuariosModule)
   
  ],
  controllers: [SucursalController],
  providers: [SucursalService],
  exports: [SucursalService],
})
export class SucursalModule {}
