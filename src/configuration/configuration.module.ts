import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongosseConfig from './config/database.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้ ConfigModule พร้อมใช้งานทั่วทั้งแอปพลิเคชัน
      envFilePath: ['.env'], // ระบุ path ของไฟล์ .env
      load: [appConfig, mongosseConfig], // โหลด config ที่สร้างขึ้น
    }),
  ],
})
export class ConfigurationModule {}
