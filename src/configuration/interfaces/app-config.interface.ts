import { LogLevel } from '@nestjs/common';

export interface IAppConfig {
  port: number;
  webUrl: string;
  apiUrl: string;
  apiVersion: string;
  apiEnvirontment: string;
  apiLastUpdate: string;
  swaggerEnable: boolean;
  swaggerStatsUser: string;
  swaggerStatsPass: string;
  logLevel: LogLevel[];
  apiAuthor: string;
  apiAuthorEmail: string;
}
