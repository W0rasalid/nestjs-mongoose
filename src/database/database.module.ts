import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfig } from 'src/configuration/config/database.config';
import { IMongooseConfig } from 'src/configuration/interfaces/mongosse-config.interface';

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule], //import ConfigModule เพื่อให้ ConfigService ใช้งานได้
    //   useFactory: async (configService: ConfigService) => {
    //     const mongoCfg = configService.get<IMongooseConfig>('mongoose'); // ดึงค่า config จาก 'mongoose'
    //     return {
    //       uri: mongoCfg.uri,
    //       ...mongoCfg.options,
    //     };
    //   },
    //   inject: [ConfigService], // Inject ConfigService
    // }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfig,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
