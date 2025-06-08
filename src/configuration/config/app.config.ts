import { registerAs } from '@nestjs/config';
import { IAppConfig } from '../interfaces/app-config.interface';

const appConfig = registerAs('app', (): IAppConfig => {
  return {
    port: parseInt(process.env.PORT) || 4000,
    swaggerEnable: process.env.SWAGGER_ENABLE === 'true',
    apiEnvirontment: process.env.API_ENVIRONMENT || 'development',
    logLevel: JSON.parse(process.env.APP_LOG_LEVEL || null) || [
      'info',
      'log',
      'error',
    ],
    webUrl: process.env.WEB_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:4000',
    apiVersion: process.env.API_VERSION || 'v1',
    apiLastUpdate: process.env.API_LAST_UPDATE || new Date().toISOString(),
    apiAuthor: process.env.API_AUTHOR || 'Worasalid Juicharoen',
    apiAuthorEmail: process.env.API_AUTHOR_EMAIL || 'worasalid@gmail.com',
    swaggerStatsUser: process.env.SWAGGER_STATS_USER_NAME,
    swaggerStatsPass: process.env.SWAGGER_STATS_PASSWORD,
  };
});

export default appConfig;
