import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto, GetUserDto } from './definitions';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @Post()
  public async createUser(@Body() user: CreateUserDto): Promise<GetUserDto> {
    return this.usersService.createUser(user);
  }

  @ApiOperation({ summary: 'List users' })
  @Get()
  public async listUsers(): Promise<GetUserDto[]> {
    return this.usersService.listUsers();
  }

  @ApiOperation({ summary: 'Read user' })
  @Get('/:userId')
  public async readUser(@Param('userId', ParseIntPipe) userId: number): Promise<GetUserDto> {
    return this.usersService.getUserById(userId);
  }

  @ApiOperation({ summary: 'Update user' })
  @Put('/:userId')
  public async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: Partial<CreateUserDto>
  ): Promise<GetUserDto> {
    return this.usersService.updateUser(userId, user);
  }
}
