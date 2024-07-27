import { Module } from '@nestjs/common';
import { TicketModule } from './ticket/ticket.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { AreasModule } from './areas/areas.module';
@Module({

  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sistema-tickets'),

    TicketModule,

    UsuariosModule,

    SucursalModule,

    AutenticacionModule,

    

    AreasModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
