import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './business/users/users.module';
import { OrdersModule } from './business/orders/orders.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, UsersModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
