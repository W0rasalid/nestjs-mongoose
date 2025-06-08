import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository'; // Import Repository

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository, // ลงทะเบียน Repository ให้เป็น Provider
  ],
  exports: [UsersService], // ถ้า Module อื่นจะใช้ UsersService
})
export class UsersModule {}
