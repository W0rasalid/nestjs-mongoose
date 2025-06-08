import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<UserDocument>;
  findAll(): Promise<UserDocument[]>;
  findById(id: string): Promise<UserDocument | null>;
  findByEmail(email: string): Promise<UserDocument | null>; // เพิ่ม findByEmail
  update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument | null>;
  delete(id: string): Promise<UserDocument | null>;
}
