import { Module } from '@nestjs/common';
import { TicketModule } from './ticket/ticket.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { AreasModule } from './areas/areas.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'webp'),
      serveRoot: '/uploads/webp',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/sistema-tickets'),

    TicketModule,

    UsuariosModule,

    SucursalModule,

    AutenticacionModule,

    AreasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
