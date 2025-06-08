import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { ParseMongoIdPipe } from 'src/common/pipes/mongo.pipe';
import { Types } from 'mongoose';

@Controller('users') // Base route for this controller will be /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint: GET /users
  // Description: Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAllUser();
  }

  // Endpoint: GET /users/:id
  // Description: Get a single user by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(id);
  }

  // Endpoint: POST /users
  // Description: Create a new user
  @Post()
  @UsePipes(ValidationPipe)
  // @HttpCode(HttpStatus.CREATED) // Set HTTP status code to 201 Created
  async create(@Body() createUserDto: CreateUserDto): Promise<HttpException> {
    const result = await this.usersService.createUser(createUserDto);

    return new HttpException('success', HttpStatus.OK);
  }

  // Endpoint: PUT /users/:id
  // Description: Update an existing user by ID
  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('id', id);
    console.log('id hex', id.toHexString());
    return this.usersService.update(id, updateUserDto);
  }

  // Endpoint: DELETE /users/:id
  // Description: Delete a user by ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Set HTTP status code to 204 No Content
  async delete(@Param('id') id: string): Promise<void> {
    // Return type is void as there's no content
    await this.usersService.delete(id);
  }
}
