import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  zipCode: string;
}

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  userName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsInt()
  @Min(1)
  @ApiPropertyOptional()
  age: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional()
  roles?: string[];

  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional()
  @Type(() => AddressDto)
  address?: AddressDto;
}
