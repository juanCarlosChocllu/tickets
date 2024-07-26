import { Module } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { SucursalController } from './sucursal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sucursal, SucursalSchema } from './schema/sucursal.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Sucursal.name, schema:SucursalSchema}])],
  controllers: [SucursalController],
  providers: [SucursalService],
})
export class SucursalModule {}
