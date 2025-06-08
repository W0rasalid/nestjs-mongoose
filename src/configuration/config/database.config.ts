import { registerAs } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMongooseConfig } from '../interfaces/mongosse-config.interface';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

export const mongosseConfig = registerAs('mongoose', (): IMongooseConfig => {
  return {
    uri: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    options: {
      user: process.env.MONGO_USERNAME,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_DATABASE_NAME,
      authSource: process.env.MONGO_AUTH_SOURCE || 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: process.env.MONGOOSE_AUTO_INDEX === 'true',
      maxPoolSize: parseInt(process.env.MONGOOSE_POOL_SIZE, 10) || 5,
      serverSelectionTimeoutMS:
        parseInt(process.env.MONGOOSE_SERVER_SELECTION_TIMEOUT_MS, 10) || 5000,
      socketTimeoutMS:
        parseInt(process.env.MONGOOSE_SOCKET_TIMEOUT_MS, 10) || 45000,
    },
  };
});

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const mongoCfg = this.configService.get<IMongooseConfig>('mongoose');

    if (!mongoCfg || !mongoCfg.uri) {
      throw new Error('Mongoose configuration is missing or invalid.');
    }
    return {
      uri: mongoCfg.uri,
      ...mongoCfg.options,
    };
  }
}

export default mongosseConfig;
