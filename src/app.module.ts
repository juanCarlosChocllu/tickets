import { Module } from '@nestjs/common';
import { TicketModule } from './ticket/ticket.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({

  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sistema-tickets'),

    TicketModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
