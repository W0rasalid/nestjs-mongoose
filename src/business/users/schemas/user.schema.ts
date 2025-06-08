import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'user', timestamps: true }) // เพิ่ม timestamps เพื่อให้มี createdAt และ updatedAt อัตโนมัติ
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, min: 1 })
  age: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: ['viewer'] }) // Array of strings, default role
  roles: string[];

  @Prop({ type: Object }) // Nested object for address
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
