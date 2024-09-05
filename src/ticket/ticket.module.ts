import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MulterModule } from '@nestjs/platform-express';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Imagen,
  Ticket,
  TicketSchema,
  ImagenSchema,
} from './schemas/ticket.echema';
import { SucursalModule } from 'src/sucursal/sucursal.module';

@Module({
  imports: [
    SucursalModule,
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forFeature([
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
      {
        name: Imagen.name,
        schema: ImagenSchema,
      },
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
