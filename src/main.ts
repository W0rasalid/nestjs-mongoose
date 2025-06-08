import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IAppConfig } from './configuration/interfaces/app-config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>('app');

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    exposedHeaders: ['Content-Disposition', 'File-Name'],
  });

  //Swagger
  if (appConfig?.swaggerEnable) {
    const options = new DocumentBuilder()
      .setTitle('MongoDB API Service')
      .setDescription(
        `
            Language: Node Typescripts
            FrameWork: Nest JS Framework
            Node Version: ^22
            ------------------------------------------
            Environment: ${appConfig.apiEnvirontment}
            API Version: ${appConfig.apiVersion}
            LastUpdate: ${appConfig.apiLastUpdate}
            ------------------------------------------
            Author: ${appConfig.apiAuthor}
            Contacts: ${appConfig.apiAuthorEmail}
            `,
      )
      .setVersion(appConfig.apiVersion)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(appConfig.port ?? 3000);
}
bootstrap();
