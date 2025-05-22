import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'Create new user',
    description: 'Create user with email and password',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users from the database',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  @ApiOperation({
    summary: 'Get user by username',
    description: 'Get user details by their username',
  })
  findOne(@Param('username') username: string) {
    return this.usersService.findUsername(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
