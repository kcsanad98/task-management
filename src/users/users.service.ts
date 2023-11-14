import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './user.dto';
import { PostgresErrorCodes, doErrorCodesMatch } from '../utils/postgres-errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  public async createUser(user: CreateUserDto): Promise<GetUserDto> {
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (doErrorCodesMatch(error, PostgresErrorCodes.UNIQUE_CONSTRAINT_VIOLATED)) {
        throw new ConflictException(`User with username [${user.username}] already exists.`);
      } else {
        throw error;
      }
    }
  }

  public async listUsers(): Promise<GetUserDto[]> {
    return this.usersRepository.find();
  }

  public async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id [${id}] doesn't exist.`);
    }
    return user;
  }

  public async updateUser(id: number, user: UpdateUserDto): Promise<GetUserDto> {
    await this.getUserById(id);
    const updateUserData: User = this.usersRepository.create({ ...user, id });
    try {
      return await this.usersRepository.save(updateUserData);
    } catch (error) {
      if (doErrorCodesMatch(error, PostgresErrorCodes.UNIQUE_CONSTRAINT_VIOLATED)) {
        throw new ConflictException(`User with username [${user.username}] already exists.`);
      } else {
        throw error;
      }
    }
  }
}
