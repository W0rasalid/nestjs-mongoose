import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string, Types.ObjectId> {
  transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
    // ตรวจสอบว่าค่าที่เข้ามาเป็น ObjectId ที่ถูกต้องหรือไม่
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(
        `Invalid ID format. ID must be a valid MongoDB ObjectId.`,
      );
    }
    // แปลงค่า string เป็น ObjectId เพื่อส่งต่อไปยัง Service/Repository
    return new Types.ObjectId(value);
  }
}
