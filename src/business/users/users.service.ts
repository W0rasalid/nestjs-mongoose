import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // READ (All Users)
  async findAllUser(): Promise<User[]> {
    const data = await this.usersRepository.findAll();
    return data;
  }

  // READ (Single User by ID)
  async findUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
    return user;
  }

  // CREATE
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // อาจเพิ่ม logic ตรวจสอบอีเมลซ้ำตรงนี้ใน Service
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException(
        `User with email "${createUserDto.email}" already exists.`,
      );
    }
    return this.usersRepository.create(createUserDto);
  }

  // UPDATE
  async update(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.usersRepository.findById(id.toHexString());

      if (!user || user === null) {
        throw new NotFoundException(`User with ID "${id}" not found.`);
      }
      const updatedUser = await this.usersRepository.update(id, updateUserDto);

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  // DELETE
  async delete(id: string): Promise<User> {
    const deletedUser = await this.usersRepository.delete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
    return deletedUser;
  }
}
